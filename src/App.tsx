import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BrowseRoute, BrowseTvRoute, BrowseMovieRoute, NoMatchRoute, WatchRoute } from '@/routes'
import theme from '@/styles'
import { NavBar } from './components'
import { useGetGenreListQuery as useGetMovieGenreListQuery } from '@/store/services/ApiMovieSlice'
import { useGetGenreListQuery as useGetTvGenreListQuery } from '@/store/services/ApiSerieSlice'

function App() {
  useGetMovieGenreListQuery(null)
  useGetTvGenreListQuery(null)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/browse" replace={true} />} />
          <Route path="/browse">
            <Route path="/browse" element={<BrowseRoute />} />
            <Route path="/browse/tv" element={<BrowseTvRoute />} />
            <Route path="/browse/movie" element={<BrowseMovieRoute />} />
          </Route>
          <Route path="/latest" element={<BrowseMovieRoute />} />
          <Route path="/watch/:category/:id" element={<WatchRoute />} />
          <Route path="*" element={<NoMatchRoute />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
