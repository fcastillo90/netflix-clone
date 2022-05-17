// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import { configSlice } from '@/store/features/configSlice'
import { modalSlice } from '@/store/features/modalSlice'
import { configApi } from '@/store/services/ApiConfigSlice'
import { movieApi } from '@/store/services/ApiMovieSlice'
import { serieApi } from '@/store/services/ApiSerieSlice'

function render(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  {
    preloadedState,
    store = configureStore({ 
      reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        [serieApi.reducerPath]: serieApi.reducer,
        [configApi.reducerPath]: configApi.reducer,
        modal: modalSlice.reducer,
        config: configSlice.reducer
      }, 
      preloadedState 
    }),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }