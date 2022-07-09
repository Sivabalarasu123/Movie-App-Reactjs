import React from 'react'
import styled from 'styled-components'

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`
const CoverImage = styled.img`
  height: 362px; //height taken from that Api Image
  object-fit: cover; //whenever giving fixed height ,need to use object-cover for better UI
`
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  text-tranform: capitalize;
`

function Movie(props) {
  //these props are from API
  const { Title, Year, imdbID, Type, Poster } = props.movie
  return (
    <MovieContainer
      onClick={() => {
        props.setSelectedMovie(imdbID)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      <CoverImage src={Poster} />
      <MovieName>{Title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year:{Year}</MovieInfo>
        <MovieInfo>Type:{Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  )
}

export default Movie
