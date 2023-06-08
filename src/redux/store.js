import {configureStore} from '@reduxjs/toolkit';
import notesSlice from './features/notesSlice';
import chatReducer from './reducer/ChatReducer';
import userSlice from './features/userSlice';

export default configureStore({
  reducer: {
    notes: notesSlice,
    allChatDetail: chatReducer,
    users: userSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
