import axios from "axios";

const API_URL = "/api/posts";

export const createPost = async (postData) => {
  const response = await axios.post(API_URL, postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPostById = async (id) => {
  const posts = await getPosts();
  return posts.find((post) => post._id === id);
};

export const updatePost = async (id, postData) => {
  const response = await axios.put(`${API_URL}/${id}`, postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
