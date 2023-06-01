import {createSlice} from '@reduxjs/toolkit';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    allNotes: [],
  },
  reducers: {
    addNote: (state, action) => {
      state.allNotes = [...state.allNotes, action.payload];
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
export const {addNote} = notesSlice.actions;

export default notesSlice.reducer;
