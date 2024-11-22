<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
=======
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
