import { useState, useEffect } from "react";
import useCachedApiCall from "./useCachedApiCall";

export default function () {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const [mediaType, setMediaType] = useState("movie");
  const [searchQuery, setSearchQuery] = useState("");
  const [_genre, setGenre] = useState("");
  const [YearStart, setYearStart] = useState("");
  const [YearEnd, setYearEnd] = useState("");
  const [isInitial, setInitial] = useState(true);
  const [page, setPage] = useState(1);
  const searchAPI = useCachedApiCall(API_KEY, "https://api.themoviedb.org/3");

  const performAPICall = () => {
    if (searchQuery) {
      const api_query = `/search/${mediaType}?api_key=${API_KEY}&query=${searchQuery}&page=${page}&include_adult=false&language=en-US`;
      console.log("[Use Movie Search] ", api_query);
      searchAPI.apiCall(api_query, true);
    }
  };

  useEffect(() => {
    performAPICall();
  }, [searchQuery, page, mediaType, YearStart, YearEnd, _genre]);

  return {
    mediaType,
    setMediaType,
    searchQuery,
    setSearchQuery,
    _genre,
    setGenre,
    YearStart,
    setYearStart,
    YearEnd,
    setYearEnd,
    page,
    setPage,
    performAPICall,
    searchAPI,
    isInitial,
    setInitial,
  };
}
