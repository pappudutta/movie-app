import React, { useEffect, useState } from "react";
import getDataFromApi from "../services/api-client";

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("Loading...");
    // on recall api set data and error null to remove previous value
    setData(null);
    setError(null);

    getDataFromApi(url)
      .then(res => {
        setLoading(false);
        setData(res);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
