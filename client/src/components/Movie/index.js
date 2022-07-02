import React, { useState, useEffect } from "react";
import styles from "../Main/styles.module.css";
import MovieList from "../MoviesList";
import SearchBox from "../SearchBox";
import axios from "axios";

const Movie = () => {
    const token = localStorage.getItem("token")
    const headers = {
        authorization: token
    }

    const [favourites, setFavourites] = React.useState([]);
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    function addToPlaylist(movie) {
        axios
            .put("/playlistadd", movie, { headers })
    }

    function removeFromPlaylist(movie) {
        axios
            .put("/playlistdel", movie, { headers })
    }

    const getMovieRequest = async (searchValue) => {
        const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    useEffect(() => {
        axios.get('/playlist', { headers }).then((response) => {
            setFavourites(response.data);
        });
    }, []);

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);

        addToPlaylist(movie)
    };

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
        removeFromPlaylist(movie);
    };

    const [privat, setPrivate] = useState(true);
    const [userid, setuserID] = useState('');

    function prvt() {
        axios.put('/pvt', privat, { headers }).then((response) => {
            setPrivate(response.data.private)
            setuserID(response.data.id);
        });
    }

    useEffect(() => {
        axios.get('/pvt', { headers }).then((response) => {
            setPrivate(response.data.private)
            setuserID(response.data.id);
        });
    }, []);

    return (
        <div className={styles.main_container}>

            <div className={styles.search_things}>

                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className={styles.list_row}>
                <div className={styles.movies_row}>
                    <MovieList
                        movies={movies}
                        handleFavouritesClick={addFavouriteMovie}
                        heart={false}
                    />
                </div>
            </div>
            <div >
                <h1 className={styles.fav_head} >Favourites</h1>
                <div className={styles.prvt_head}><button className={styles.white_btn} onClick={() => prvt()} >
                    {privat ? 'Public' : "Private"} </button>
                    {!privat && <a href={`/userplaylist/` + userid} >
                        SHARE ME .....</a>}
                </div>
            </div>
            <div className={styles.list_row}>
                <div className={styles.movies_row}>
                    <MovieList
                        movies={favourites}

                        handleFavouritesClick={removeFavouriteMovie}
                        heart={true}
                    />
                </div>
            </div>
        </div >
    );
};

export default Movie;