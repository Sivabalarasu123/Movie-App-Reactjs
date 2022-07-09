import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Movieicon from './assets/movie-icon.svg'
import Searchicon from './assets/search-icon.svg'
import Movie from './components/Movie'
import MovieInfo from './components/MovieInfo'

export const API_KEY = 'a9118a3a'
const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  flex-direction: row;
  padding: 10px;
  color: white;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  justify-content: space-between;
  align-items: center;
`
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
`
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`
const MovieListContainer = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
padding:30px;
gap:25px;
justify-content:space-evenly:
`
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`

function App() {
  const [searchQuery, setSearchQuery] = useState()
  const [timeOutId, setTimeOutId] = useState()
  const [movieList, setMovieList] = useState([])
  const [selectedMovie, setSelectedMovie] = useState()

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    )
    // console.log(response)
    setMovieList(response.data.Search)
  }

  const textHandler = (event) => {
    setSelectedMovie('')
    clearTimeout(timeOutId)
    setSearchQuery(event.target.value)
    const timeout = setTimeout(() => fetchData(event.target.value), 500)
    setTimeOutId(timeout)
  }

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src={Movieicon} /> React Movie Application
        </AppName>
        <SearchBox>
          <SearchIcon src={Searchicon} />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={textHandler}
          />
        </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieInfo
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <Movie
              key={index}
              movie={movie}
              setSelectedMovie={setSelectedMovie}
            />
          ))
        ) : (
          <Placeholder src={Movieicon} />
        )}
      </MovieListContainer>
    </Container>
  )
}

export default App
