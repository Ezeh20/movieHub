import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Movies from './Pages/Movies/Movies'
import PageNotFound from './Pages/404/404'
import MovieDetails from './Components/Movie_details/movie_details'
import Tv from './Pages/Tv/tv'
import People from './Pages/People/people'
import TvDetails from './Components/Tv_details/tv_details'
import PeopleDetails from './Components/People_details/people_details'

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/movie'>
          <Route index element={<Movies />} />
          <Route path=':id' element={<MovieDetails />} />
        </Route>
        <Route path='/tv'>
          <Route index element={<Tv />} />
          <Route path=':id' element={<TvDetails />} />
        </Route>
        <Route path='/people'>
          <Route index element={<People />} />
          <Route path=':id' element={<PeopleDetails />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
