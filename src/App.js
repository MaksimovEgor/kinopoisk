import styled from 'styled-components';
import MovieIcon from '@material-ui/icons/Movie';
import findIcon from '../src/common/findIcon.png';
import MovieComponent from "./components/MovieComponent";
import {useState} from "react";
import axios from "axios";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = '5f318c08';
const Container = styled.div`
  display: flex;
  flex-direction: column
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  padding: 10px;
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

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 10px 10px;
  width: 50%;
  border-radius: 6px;
  margin-left: 50px;
`

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
  align-items: center;
`

const SearchInput = styled.input`
  color: black;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  margin-left: 15px;
  border: none;
`

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  gap: 24px;
`

function App() {

    const [searchQuery, updateSearchQuery] = useState();
    const [timeoutId, updateTimeout] = useState();
    const [movieList, updateMovieList] = useState([]);
    const [selectedMovie, onMovieSelect] = useState();

    const fetchData = async (searchString) => {
        const response = await axios.get(
            `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
        );
        updateMovieList(response.data.Search);
    }


    const onTextChange = (event) => {
        clearTimeout(timeoutId);
        updateSearchQuery(event.target.value);
        const timeout = setTimeout(() => fetchData(event.target.value), 500);
        updateTimeout(timeout);
    }

    return (
        <Container>
            <Header>
                <AppName>
                    <MovieIcon/>
                    Kinopoisk
                </AppName>
                <SearchBox>
                    <SearchIcon src={findIcon}/>
                    <SearchInput placeholder='Search movie' onChange={onTextChange} value={searchQuery}/>
                </SearchBox>
            </Header>
            {selectedMovie &&
            <MovieInfoComponent
                selectedMovie={selectedMovie}
                onMovieSelect={onMovieSelect}
            />}
            <MovieListContainer>
                {
                    movieList?.length ? movieList.map((movie, index) =>
                        <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>) : "Найдите фильм"
                }

            </MovieListContainer>
        </Container>
    );
}

export default App;
