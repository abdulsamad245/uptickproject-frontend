import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function useCachedApiCall(API_KEY, path_prefix = "") {
  const cache = useRef({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [response, setResponse] = useState(null);

  const apiCall = (
    api_path,
    _genre = "",
    releaseYearStart = "",
    releaseYearEnd = ""
  ) => {
    if (api_path) {
      setLoading(true);
      setError(false);
      setErrorMsg("");
      setResponse(null);
      axios
        .get(
          `${path_prefix}${api_path}&api_key=${API_KEY}&with_genres=${_genre}&primary_release_date.gte=${releaseYearStart}&primary_release_date.lte=${releaseYearEnd}&with_runtime.gte=90`
        )

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
    } else {
      setError(true);
      setErrorMsg("API Request was empty!");
    }
  };

  return { loading, error, errorMsg, response, apiCall };
}