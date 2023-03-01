import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/HomePage/HomePage.css";
import useMovieSearch from "../CustomHooks/useMovieSearch";
import useCachedApiCall from "../CustomHooks/useCachedApiCall";

const MovieFilter = ({ movieSearch, trendingData }) => {
  const searchFilters = movieSearch || trendingData;
  const [_genre, setGenre] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");
  const [YearStart, setYearStart] = useState("");
  const [YearEnd, setYearEnd] = useState("");
  const [releaseYearٍStart, setReleaseYearStart] = useState(new Date());
  const [releaseYearEnd, setReleaseYearEnd] = useState(new Date());
  const _setGenre = searchFilters.setGenre;
  const _setYearStart = searchFilters.setYearStart;
  const _setYearEnd = searchFilters.setYearEnd;

  const resetFilter = () => {
    _setGenre("");
    _setYearStart("");
    _setYearEnd("");
    setSelectedOption("all");
    setReleaseYearStart(new Date());
    setReleaseYearEnd(new Date());
  };

  useEffect(() => {
    _setGenre(_genre);
    _setYearStart(YearStart);
    _setYearEnd(YearEnd);

    console.log(_genre, YearStart, YearEnd);
  }, [YearStart, YearEnd, _genre]);

  return (
    <div className="section">
      <div className="section-heading trending-section-heading">
        <div>
          <div className="sort-title">Sort by Genre: </div>
          <select
            value={selectedOption}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="all">All</option>
            <option value="28">Action</option>
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
        </div>

        <div>
          <div className="sort-title"> Sort by Release Date: </div>
          <div className="btn-group">
            <span className="sort">from</span>
            <DatePicker
              selected={releaseYearٍStart}
              onChange={(date) => {
                setReleaseYearStart(date);
                setYearStart(date.toISOString().split("T")[0]);

                console.log({ date: date.toISOString().split("T")[0] });
              }}
            />
          </div>

          <div className="btn-group">
            <span className="sort-2">to</span>
            <DatePicker
              selected={releaseYearEnd}
              onChange={(date) => {
                setReleaseYearEnd(date);
                setYearEnd(date.toISOString().split("T")[0]);
              }}
            />
          </div>
        </div>
        <div className="text-center btn-reset">
          <button onClick={resetFilter} className="btn btn-sm btn-light mt-4">
            Reset Search Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;
