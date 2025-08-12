import Message from "../models/message.model.js";
import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => { 
    try { 

        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password "); 
        
        res.status(200).json(filteredUsers);

    } catch (error) { 
        console.error("Error in getUsersForSidebar", error.message);
        res.status(500).json({message: "Internal server error"}); 
    }
}

export const getMessages = async (req, res) => {

    try { 

        const {id:userToChatID} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatID},
                {senderId: userToChatID, receiverId: myId}
            ]
        })

        res.status(200).json(messages);

    } catch (error) {
    console.log("Error in getMessages", error.message);
    res.status(500).json({message: "Internal server error"});
    } 
} 

export const sendMessage = async (req, res) => { 
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params; 
        const senderId = req.user._id; 
        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image); 
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId, 
            receiverId,
            text,
            image: imageUrl
        }); 

        await newMessage.save(); 

        //todo: realtime message sending logic here
        res.status(200).json(newMessage);

    } catch (error) {
        console.error("Error in sendMessage", error.message);
        res.status(500).json({message: "Internal server error"});
    }
} 