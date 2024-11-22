import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, createPost, updatePost, deletePost, getPostById } from '../services/postService';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      return await getPosts();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (postData, { rejectWithValue }) => {
    try {
      return await createPost(postData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExistingPost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, postData }, { rejectWithValue }) => {
    try {
      return await updatePost(id, postData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removePost = createAsyncThunk(
  'posts/deletePost',
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
  name: 'posts',
  initialState: {
    items: [],
    selectedPost: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post._id !== action.payload);
      })
      .addCase(updateExistingPost.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  }
});

export default postSlice.reducer;