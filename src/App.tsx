import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DetailRoute, BrowseRoute } from '@/routes'
import theme from '@/styles'
import { NavBar } from './components'
import { useGetGenreListQuery } from '@/store/services/ApiMovieSlice'

function App() {
  useGetGenreListQuery(null)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<BrowseRoute />}>
            <Route path="/browse" element={<BrowseRoute />} />
            <Route path="/detail" element={<DetailRoute />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
