import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { API_KEY } from '../App'

const MovieInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgrey;
`
const CoverImage = styled.img`
  height: 350px; //height taken from that Api Image
  object-fit: cover; //whenever giving fixed height ,need to use object-cover for better UI
`
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`
const MovieInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`
const MovieInfoTop = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  &span {
    opacity: 0.5;
  }
`
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`

function MovieInfo(props) {
  const [movieInfo, setMovieInfo] = useState()

  const { selectedMovie } = props
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => {
        setMovieInfo(response.data)
      })
  }, [selectedMovie])

  return (
    <MovieInfoContainer>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} />
          <MovieInfoColumn>
            <MovieName>
              {movieInfo?.Type}: {movieInfo?.Title}
            </MovieName>
            <MovieInfoTop>
              IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfoTop>
            <MovieInfoTop>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfoTop>
            <MovieInfoTop>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfoTop>
            <MovieInfoTop>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfoTop>
            <MovieInfoTop>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfoTop>
            <MovieInfoTop>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfoTop>
            <MovieInfoTop>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfoTop>
            <MovieInfoTop>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfoTop>
            <MovieInfoTop>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfoTop>
            <MovieInfoTop>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfoTop>
          </MovieInfoColumn>
          <Close onClick={() => props.setSelectedMovie()}>X</Close>
        </>
      ) : (
        'Loading...'
      )}
    </MovieInfoContainer>
  )
}

export default MovieInfo
