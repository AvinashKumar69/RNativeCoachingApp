import {configureStore} from '@reduxjs/toolkit';
import notesSlice from './features/notesSlice';
import chatReducer from './reducer/ChatReducer';

export default configureStore({
  reducer: {
    notes: notesSlice,
    allChatDetail: chatReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
