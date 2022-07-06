import React, { useState, useEffect } from "react";
import styles from "../Main/styles.module.css";
import axios from "axios";
import MovieList from "../MoviesList";

import "./index.css"


const PlaylistPage = () => {

    const token = localStorage.getItem("token")
    const headers = {
        authorization: token
    }

    const handleLogout = () => {
        localStorage.removeItem("token");

        window.location.replace('/');
    };



    const [movies, setMovies] = React.useState([]);
    useEffect(() => {

        axios.get("/selfplaylist/movieslist", { headers }).then((response) => {

            setMovies(response.data);
            // console.log(response.data);
        })
    })

    function copy(value) {
        navigator.clipboard.writeText(value)
    };
    // const [privat, setPrivate] = useState(false);
    // const [playlistid, setPlaylistid] = useState('');

    // function prvt(playlistid, status) {
    //     axios.put('./selfplaylist/private', { playlistid: playlistid, private: status }, { headers }).then((response) => {
    //         console.log(response.data.private)
    //         // setPlaylistid(response.data.id);
    //     });
    // }


    const Privatebody = (props) => {
        const [privt, setPrivt] = useState(props.private)

        const privatefun = async (playid, status) => {
            setPrivt(!status);

            await axios.put('./selfplaylist/private', { playlistid: playid, private: status })
        }
        // setPlaylistid(response.data.id);

        const deleteplaylist = async (playid) => {
            console.log("trying to delete")

            await axios.post('./selfplaylist/delplaylist', { playlistid: playid }, { headers })
            // window.location.reload();
            // setPlaylistid(response.data.id);

        }
        return (
            <div className={styles.prvt_head}>
                
                <div>
                <button className={styles.white_btn} onClick={() => deleteplaylist(props.id)} >Delete</button>
                <button className={styles.white_btn} onClick={() => privatefun(props.id, privt)} >

                    {privt ? 'Public' : "Private"} </button>
                {!privt &&
                    <button className={styles.copy_button} onClick={() => copy(window.location.origin + `/playlistuser/` + props.id)}>CLICK TO COPY LINK</button>
                }
                </div>
            </div>
        )
    }


    // console.log(details)
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Movies App</h1>
                <div>
                    <button className={styles.white_btn}
                        onClick={() => window.location.replace("./")}
                    >
                        Home
                    </button>
                    <button className={styles.white_btn}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {movies.map((item) => (
                <>
                <h1 className={styles.heading_playlist}>{item.name}</h1>
                <div className={styles.options_playlist}>
                    <Privatebody
                        id={item._id}
                        value={item.value}
                        name={item.name}
                        private={item.private} />
                        </div>
                    <div className={styles.list_row}>

                        <div className={styles.movies_row}>
                            {<MovieList
                                playlistid={item._id}
                                movies={item.playlist}
                                handleFavouritesClick={() => { }}
                                heart={true}
                            />}
                        </div>
                    </div>
                </>
            ))}
        </div >
    );
};

export default PlaylistPage;