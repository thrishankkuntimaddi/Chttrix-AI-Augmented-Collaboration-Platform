import React from 'react';

const MessageCard = ({ imageUrl, name, status }) => {
  return (
    <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="flex flex-col justify-center">
        <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">{name}</p>
        <p className="text-[#637488] text-sm font-normal leading-normal line-clamp-2">{status}</p>
      </div>
    </div>
  );
};

export default MessageCard;
