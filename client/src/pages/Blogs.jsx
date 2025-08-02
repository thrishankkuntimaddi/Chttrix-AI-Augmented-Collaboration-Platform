import { useState } from "react";
import BlogCard from "../components/BlogCard";
import BlogDetailModal from "../components/BlogDetailModal";
import BlogModal from "../components/BlogModal"; // ✅ Using correct modal

const Blogs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogPosts, setBlogPosts] = useState([
    {
      title: "Project Alpha Milestone Achieved",
      shortDescription: "Initial design phase completed successfully.",
      fullDescription:
        "The team completed the initial design phase of Project Alpha, marking a significant milestone. It involved detailed wireframes, component planning, and user flows. Hats off to the entire team!",
      image: "https://picsum.photos/500/300",
      tags: ["Milestone", "UX"],
      contributors: ["Sarah", "David"],
    },
    {
      title: "Sarah's Outstanding Contribution",
      shortDescription: "Sarah's UI work enhanced user experience.",
      fullDescription:
        "Sarah's dedication to designing an intuitive UI for Project Beta helped boost user satisfaction and clarity. Her work is a gold standard.",
      image: "",
      tags: ["Design", "Praise"],
      contributors: ["Sarah"],
    },
  ]);

  const handleCreateBlog = (newBlog) => {
    setBlogPosts([newBlog, ...blogPosts]);
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blogs</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          + New Blog
        </button>
      </div>

      <div className="space-y-6">
        {blogPosts.map((blog, index) => (
          <BlogCard key={index} blog={blog} onDoubleClick={setSelectedBlog} />
        ))}
      </div>

      {/* ✅ Use correct blog creation modal */}
      {showModal && (
        <BlogModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateBlog}
        />
      )}

      {/* ✅ View blog detail popup */}
      {selectedBlog && (
        <BlogDetailModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </div>
  );
};

export default Blogs;
