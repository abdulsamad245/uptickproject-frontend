import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function useCachedApiCall(API_KEY, path_prefix = "") {
  const cache = useRef({});
  var api_req;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [response, setResponse] = useState(null);
  const [_genre, setGenre] = useState("");
  const [YearStart, setYearStart] = useState("");
  const [YearEnd, setYearEnd] = useState("");

  const apiCall = (api_path, isSearch = false) => {
    if (api_path) {
      console.log("API req:", api_path);
      if (cache.current[api_path]) {
        console.log("Getting data from cache...", cache.current[api_path]);
        setError(false);
        setErrorMsg("");
        setResponse(cache.current[api_path]);
      } else {
        if (isSearch) {
          api_req = `${path_prefix}${api_path}`;
        } else {
          api_req = `${path_prefix}${api_path}&api_key=${API_KEY}&with_genres=${_genre}&primary_release_date.gte=${YearStart}&primary_release_date.lte=${YearEnd}&with_runtime.gte=90`;
        }
        axios
          .get(api_req)
          .then((res) => {
            cache.current[api_path] = res.data;
            setResponse(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            setError(true);
            console.log("[API ERROR]", err.message, err);
            setErrorMsg(err.message);
          })
          .then(() => setLoading(false));
      }
    } else {
      setError(true);
      setErrorMsg("API Request was empty!");
    }
    return;
  };

  return {
    loading,
    error,
    errorMsg,
    response,
    apiCall,
    _genre,
    YearStart,
    YearEnd,
    setGenre,
    setYearStart,
    setYearEnd,
  };
}
