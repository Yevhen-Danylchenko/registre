import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
  },
  reducers: {
    addUser: (state, action) => {
      console.log("Saving user:", action.payload); 
      state.users.push(action.payload);
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { addUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;