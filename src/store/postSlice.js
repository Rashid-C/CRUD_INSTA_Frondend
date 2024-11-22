<<<<<<< HEAD
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} from "../services/postService";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, createPost, updatePost, deletePost, getPostById } from '../services/postService';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
  async (_, { rejectWithValue }) => {
    try {
      return await getPosts();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewPost = createAsyncThunk(
<<<<<<< HEAD
  "posts/addNewPost",
=======
  'posts/addNewPost',
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
  async (postData, { rejectWithValue }) => {
    try {
      return await createPost(postData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExistingPost = createAsyncThunk(
<<<<<<< HEAD
  "posts/updatePost",
=======
  'posts/updatePost',
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
  async ({ id, postData }, { rejectWithValue }) => {
    try {
      return await updatePost(id, postData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removePost = createAsyncThunk(
<<<<<<< HEAD
  "posts/deletePost",
=======
  'posts/deletePost',
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
  async (postId, { rejectWithValue }) => {
    try {
      await deletePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
<<<<<<< HEAD
  name: "posts",
  initialState: {
    items: [],
    selectedPost: null,
    status: "idle",
    error: null,
=======
  name: 'posts',
  initialState: {
    items: [],
    selectedPost: null,
    status: 'idle',
    error: null
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
<<<<<<< HEAD
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
=======
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
        state.error = action.payload;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removePost.fulfilled, (state, action) => {
<<<<<<< HEAD
        state.items = state.items.filter((post) => post._id !== action.payload);
      })
      .addCase(updateExistingPost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (post) => post._id === action.payload._id
        );
=======
        state.items = state.items.filter(post => post._id !== action.payload);
      })
      .addCase(updateExistingPost.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post._id === action.payload._id);
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
<<<<<<< HEAD
  },
});

export default postSlice.reducer;
=======
  }
});

export default postSlice.reducer;
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
