import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todoSlice';
import postReducer from '../features/posts/postSlice'
import authReducer from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    posts: postReducer,
    auth: authReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
