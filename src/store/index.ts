import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import { movieApi } from './services/ApiMovieSlice';
import { serieApi } from './services/ApiSerieSlice';

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [serieApi.reducerPath]: serieApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    movieApi.middleware, 
    serieApi.middleware, 
    logger
  ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;