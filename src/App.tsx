import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DetailRoute, BrowseRoute, BrowseTvRoute, BrowseMovieRoute } from '@/routes'
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
          <Route path="/" />
          <Route path="/browse">
            <Route path="/browse" element={<BrowseRoute />} />
            <Route path="/browse/tv" element={<BrowseTvRoute />} />
            <Route path="/browse/movie" element={<BrowseMovieRoute />} />
          </Route>
          <Route path="/latest" element={<BrowseMovieRoute />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
