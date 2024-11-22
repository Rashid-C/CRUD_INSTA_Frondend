import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../services/postService";

const EditPostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const post = await getPostById(id);

      if (post) {
        setTitle(post.title);
        setDescription(post.description);

        const baseUrl = "https://crud-insta-backend-1.onrender.com";
        const fullImageUrl = post.image
          ? post.image.startsWith("http")
            ? post.image
            : `${baseUrl}${
                post.image.startsWith("/") ? post.image : `/${post.image}`
              }`
          : "/placeholder.png";

        setPreview(fullImageUrl);
      } else {
        setErrors({ fetch: "Post not found" });
      }
    } catch (err) {
      setErrors({ fetch: "Failed to fetch post" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    } else if (title.length > 100) {
      newErrors.title = "Title cannot exceed 100 characters";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 20) {
      newErrors.description = "Description must be at least 20 characters long";
    } else if (description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }

    if (image) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(image.type)) {
        newErrors.image = "Only JPEG, PNG, and GIF images are allowed";
      }
      if (image.size > 5 * 1024 * 1024) {
        newErrors.image = "Image size must be less than 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      setImage(selectedImage);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      try {
        await updatePost(id, formData);
        navigate("/posts");
      } catch (err) {
        setErrors({ submit: "Failed to update post" });
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-lg w-full mx-auto text-center space-y-8 bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
          Edit Post
        </h2>

        {(errors.fetch || errors.submit) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.fetch || errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-purple-300 mb-2 font-medium">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 bg-gray-800/60 text-white border rounded-lg focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-purple-500/50 focus:ring-purple-500"
              }`}
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-purple-300 mb-2 font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 bg-gray-800/60 text-white border rounded-lg focus:outline-none focus:ring-2 h-24 ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-purple-500/50 focus:ring-purple-500"
              }`}
              placeholder="Describe your post"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-purple-300 mb-2 font-medium">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleImageChange}
              className={`w-full text-purple-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                file:text-sm file:font-semibold file:bg-purple-500 file:text-white 
                hover:file:bg-purple-600 ${
                  errors.image ? "border-red-500" : ""
                }`}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Post preview"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                  console.error("Image load error:", preview);
                }}
                className="w-full h-48 object-cover rounded-lg border-2 border-purple-500/30"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg 
              hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium
              shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
