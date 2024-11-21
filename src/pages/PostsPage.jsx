import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../services/postService.js";
import { PlusCircle, RefreshCw, Trash2, Edit2 } from "lucide-react";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (err) {
        setError("Failed to delete post");
        console.error("Delete error:", err);
      }
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `${baseUrl}/${imagePath.replace(/^\/+/, "")}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0B1121]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500/30 border-t-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1121] text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              All Posts
            </h1>
            <p className="text-gray-400 mt-2">
              Discover and manage your content
            </p>
          </div>
          <Link
            to="/create"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create New Post</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-lg mb-6 flex justify-between items-center backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </span>
            <button
              onClick={fetchPosts}
              className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-lg backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <PlusCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              No posts available
            </h3>
            <p className="text-gray-400 mb-6">
              Start creating your amazing content
            </p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <PlusCircle className="w-5 h-5" />
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(post.image)}
                    alt={post.title}
                    onError={(e) => {
                      console.error("Image load error:", post.image);
                      e.target.src = "/placeholder.png";
                    }}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-100">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-6 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex gap-3">
                    <Link
                      to={`/edit/${post._id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white/5 text-gray-200 px-4 py-2 rounded-lg hover:bg-white/10 transition duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
