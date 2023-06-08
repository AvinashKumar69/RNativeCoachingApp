import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    ownUser: {},
    allOtherUsers: [],
  },
  reducers: {
    allOtherUsers: (state, action) => {
      let uid = action.payload.uid;
      let data = action.payload;
      //   state.allOtherUsers = [...state.allOtherUsers, {[uid]: data}];
      state.allOtherUsers = [...state.allOtherUsers, {data}];
    },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {allOtherUsers} = userSlice.actions;

export default userSlice.reducer;
