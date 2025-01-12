import { useState, useEffect } from "react";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:5000/api";


const useFetcher = (url) => {
 
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  


  useEffect(() => {
    const fetch = async () => {
      setloading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (e) {
        seterror(e);
      }
      setloading(false);
    };
    fetch();
  }, [url]);


    const refetch = async () => {
      setloading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (e) {
        seterror(e);
      }
      setloading(false);
    };


  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useFetcher;
