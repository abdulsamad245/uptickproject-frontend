import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import MovieFilter from "../MovieFilter";
import MovieCard from "../MovieCard/MovieCard";
import MovieSearchPage from "../MovieSearchPage/MovieSearchPage";
import "./HomePage.css";

import { trending_movie_list_placeholder } from "../../placeholders";

const TrendingSection = ({ trendingData, homeState }) => {
  const visibility = homeState;

  useEffect(() => {
    trendingData.apiCall("/discover/movie/?");

    console.log(trendingData);
  });

  const reload = () => {
    console.log("reloading...");
    trendingData.apiCall("/discover/movie/?");
  };
  return (
    <>
      {visibility && (
        <>
          <MovieFilter trendingData={trendingData} />
          <div>
            {trendingData.loading && (
              <div className="text-center mt-5">
                <div className="spinner-border text-light"></div>
              </div>
            )}
            {trendingData.error && (
              <div className="text-center">
                <div className="error-msg">
                  {trendingData.errorMsg
                    ? trendingData.errorMsg
                    : "Something went wrong!"}
                </div>
                <button onClick={reload} className="btn btn-sm btn-light mt-4">
                  Reload
                </button>
              </div>
            )}
            <div className="movie-grid">
              {trendingData.response &&
                trendingData.response.results &&
                trendingData.response.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const HomePage = ({ trendingData, movieSearch }) => {
  const [homeState, setHomeState] = useState(true);

  return (
    <div className="homepage">
      <div className="homepage-heading">
        Search your favourite movies and tv shows!
      </div>
      <MovieSearchPage
        movieSearch={movieSearch}
        homeState={homeState}
        setHomeState={setHomeState}
      />
      <TrendingSection trendingData={trendingData} homeState={homeState} />
    </div>
  );
};

export default HomePage;
