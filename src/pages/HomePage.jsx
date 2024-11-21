import { Link } from "react-router-dom";
import { Camera, Heart, Share2 } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl w-full mx-auto text-center space-y-8 bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex justify-center mb-6">
            <Camera className="w-16 h-16 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Welcome to PostGram
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Share your moments, connect with friends, and explore amazing posts
            in a vibrant community of creators.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition">
            <Camera className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Share Photos
            </h3>
            <p className="text-gray-400">
              Share your best moments with stunning photos and filters
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition">
            <Heart className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Get Likes</h3>
            <p className="text-gray-400">
              Engage with your audience and receive appreciation
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition">
            <Share2 className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Connect</h3>
            <p className="text-gray-400">
              Build meaningful connections with like-minded people
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/posts"
            className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            View Posts
          </Link>
          <Link
            to="/create"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Create Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
