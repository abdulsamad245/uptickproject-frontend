import React, {useState, useEffect} from 'react';
import useCachedApiCall from "../../CustomHooks/useCachedApiCall";
import RatingRing from "../RatingRing/RatingRing";
import {get_poster_url, get_backdrop_url, get_profile_url, format_date, get_lang_name} from "../../utilities";
import male_icon from "./male-64.png";
import female_icon from "./female-64.png";
import generic_icon from "./generic.png";
import "./MoviePage.css";

import {movie_details_placeholder} from "../../placeholders";


// the top thingy with backdrop image and poster, calling it dashboard..
const Dashboard = ({movie}) => {
    const runtime = movie.runtime || movie.episode_run_time.join(", ") || "0";
    const release_date = movie.release_date || movie.first_air_date;
    const title = movie.title || movie.name || movie.original_title || movie.original_name;
    const rating_percent = ("vote_average" in movie) ? (parseInt(movie.vote_average)*10) : null;
    
    const movie_lang = (movie.spoken_languages && movie.spoken_languages.map(lang=>(get_lang_name(lang.iso_639_1)||lang.name)));
    const tv_lang = (movie.languages && movie.languages.map(get_lang_name));
    const languages = (movie_lang || tv_lang);
    
    const seasons = movie.number_of_seasons && (`${movie.number_of_seasons} Season${(movie.number_of_seasons>1)?"s":""}`);
    
    const backdrop_style = {
        backgroundImage: (movie.backdrop_path)?(`url("${get_backdrop_url(movie.backdrop_path, 2)}"), linear-gradient(transparent, rgb(30,30,40) 50%, black)`):"linear-gradient(transparent, black)",
        backgroundBlendMode: "overlay"
    }

    return (
        <div style={backdrop_style} className="backdrop movie-page_dashboard"> 
                        
            <div className="movie-page_dashboard-poster-section">
                <div className="poster-bg">
                    {movie.poster_path && <img src={get_poster_url(movie.poster_path, 2)} alt="movie poster"/>}
                </div>
            </div>
            <div className="movie-page_dashboard-info">
                                
                {/* <div>IMDb: 6.9</div> */}
                {rating_percent &&
                <div className="py-2">
                    <RatingRing size={50} percent={rating_percent}/>
                </div>}
            
                <div className="my-3">
                    {release_date && <div>{format_date(release_date)}</div>}
                    {runtime!=0 && <div>{runtime} mins</div>}
                    {languages && <div>{languages.join(", ")}</div>}
                    {seasons && <div>{seasons}</div>}
                </div>

                {movie.genres && <div className="movie-page_genres">{movie.genres.map((g, i)=><span key={i}>{g.name}</span>)}</div>}
                <div className="movie-page_title">{title}</div>
                
                
            </div> 
        </div>
    );
}

const Profile = ({cast}) => {
    const get_profile_pic = () => {
        if(cast.profile_path)
            return get_profile_url(cast.profile_path);
        else if(cast.gender)
        {
            return (cast.gender===2)? male_icon : female_icon
        }
        else{
            return generic_icon;
        }
    }
    return <img src={get_profile_pic()} alt="" className="profile-pic"/>;
}

const MoviePage = ({match}) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const id = match.params.id;
    const  media_type = match.params.media_type;

    const movieData = useCachedApiCall(API_KEY, "http://api.themoviedb.org/3");
    const movie = movieData.response;
    console.log({movie})
    // const movie = movie_details_placeholder;    
    
    useEffect(()=>{
        const response = movieData.apiCall(`/${media_type}/${id}?`);
        console.log(response);
    },[match.params.id, match.params.media_type]);

    

    return ( 
        <React.Fragment>
            {movieData.loading && <div className="text-center mt-5"><div className="spinner-border text-light"></div></div>}
            {movieData.error && 
            <div className="text-center">
                <div className="error-msg">{(movieData.errorMsg)? movieData.errorMsg: "Something went wrong!"}</div>
            </div>
            }
            {movie &&
                <div>
                    <Dashboard movie={movie}/>
                    
                    <div className="movie-page_layout-grid"> 
                        <div className="section">
                            <div className="section-heading">Plot</div>
                            <div>{movie.overview}</div>                                                           
                        </div> 
                    </div> 

                    
                </div>
            } 
        </React.Fragment>
    );
}
 
export default MoviePage;
