import { useEffect } from "react";

// Named import anonymous function
import getDataFromApi from "./services/api-client";

// react router
import { BrowserRouter, Route, Routes } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./features/home/homeSlice";

// components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// pages
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResults from "./pages/searchResult/SearchResults";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector(state => state.home);

  const apiTesting = () => {
    // Data fetching function
    getDataFromApi("/configuration")
      .then(res => {
        const url = {
          backdrop: res.images.secure_base_url + "w780",
          poster: res.images.secure_base_url + "w500",
          profile: res.images.secure_base_url + "w780",
        };
        dispatch(getApiConfiguration(url));
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    apiTesting();
    genresCall();
  }, []);

  //  multiple api call using promise.all
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach(url => {
      return promises.push(getDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map(item => {
        allGenres[item.id] = item;
      });
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
