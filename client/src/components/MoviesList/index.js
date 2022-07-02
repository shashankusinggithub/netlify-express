import React from "react";
import "./index.css"
import heart from './heart.png'

const MovieList = (props) => {
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className="container" key={index}>
					<h1>{movie.Title}</h1>
					<img
						className="imgg"
						src={movie.Poster}
						alt='movie'></img>
					<img key={index} 
					onClick={props.handleFavouritesClick ? () => props.handleFavouritesClick(movie) : () => { }}
					alt='heart'
					className={!props.heart ? ' heart ' : 'heart_full'} src={heart} />
				</div>
			))}
		</>
	);
};

export default MovieList;
