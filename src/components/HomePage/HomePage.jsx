import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MovieCard from "../MovieCard/MovieCard";
import "./HomePage.css";

import {trending_movie_list_placeholder} from "../../placeholders";


const TrendingSection = ({trendingData})=>{
  const [timeWindow, setTimeWindow] = useState("day");
  const [_genre, setGenre] = useState("");
  const [YearStart, setYearStart] = useState("");
  const [YearEnd, setYearEnd] = useState("");
  const [releaseYearٍStart, setReleaseYearStart] = useState(new Date());
  const [releaseYearEnd, setReleaseYearEnd] = useState(new Date());
  
  const [mediaType, setMediaType] = useState("movie");

  useEffect(()=>{
    trendingData.apiCall(`/discover/movie/?`,_genre, YearStart, YearEnd);
    console.log(_genre, YearStart, YearEnd)
    // https://api.themoviedb.org/3"
    // https://api.themoviedb.org/3/discover/movie?api_key=12345&with_genres=28&primary_release_date.gte=2022-01-01&primary_release_date.lte=2022-12-31
  }, [YearStart, YearEnd, _genre])

  const reload = ()=>{
    console.log("reloading...");
    // trendingData.apiCall(`/trending/${mediaType}/${timeWindow}?`);
    trendingData.apiCall(`/discover/movie/?`,_genre, YearStart, YearEnd);
  }

  return (      
    <div className="section">
        <div className="section-heading trending-section-heading">
          <div>Sort by Genre:</div>           
          <select onChange={(e)=>setGenre(e.target.value)}>
          {/* <option value="" disabled selected>Sort by genre</option> */}
            <option value="28" selected>Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
            <option value="10770">TV Movie</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
          </select>
           <div>
            Sort by Release Date: 
           </div>
          <div className="btn-group">
          <span className='sort'>from</span> &nbsp;
          <DatePicker selected={releaseYearٍStart} onChange={(date) => {
            setReleaseYearStart(date)
            setYearStart((date.toISOString().split('T')[0]))

            console.log({"date": date.toISOString().split('T')[0]})
          }} /> &nbsp;
          <span className='sort'>to</span> &nbsp;
          <DatePicker selected={releaseYearEnd} onChange={(date) => {
            setReleaseYearEnd(date);
            setYearEnd((date.toISOString().split('T')[0]));
            }} />
          </div>
        </div>
                
        {trendingData.loading && <div className="text-center mt-5"><div className="spinner-border text-light"></div></div>}
        {trendingData.error && 
          <div className="text-center">
            <div className="error-msg">{(trendingData.errorMsg)? trendingData.errorMsg: "Something went wrong!"}</div>
            <button onClick={reload} className="btn btn-sm btn-light mt-4">Reload</button>
          </div>
        }
        <div className="movie-grid">
          {trendingData.response && trendingData.response.results && trendingData.response.results.map(movie=><MovieCard key={movie.id} movie={movie}/>)}
          {/* {trending_movie_list_placeholder.results.map(movie=><MovieCard key={movie.id} movie={movie}/>)} */}
        </div>
    </div>
  );
}


const HomePage = ({trendingData}) => {
  
    return ( 
        <div className="homepage">
            <TrendingSection trendingData={trendingData}/>            
        </div>
    );
}
 
export default HomePage;