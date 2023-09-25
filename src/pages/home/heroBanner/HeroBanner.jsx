import React, { useEffect, useState } from "react";
import "./style.scss";

import Img from "../../../components/lazyloadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

// routing navigation
import { useNavigate } from "react-router-dom";

// api data fetching hook import
import useFetch from "../../../hooks/useFetch";

// redux store import
import { useSelector } from "react-redux";

// * this function component
const HeroBanner = () => {
  // State declaration...
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  // data from redux store
  const { url } = useSelector(state => state.home);

  const { data, loading } = useFetch("/movie/upcoming");
  // console.log(data);

  //   Navigation instance
  const navigate = useNavigate();

  //   Query handler
  const searchQueryHandler = e => {
    if ((e.key === "Enter" || e === "searchBtn") && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  useEffect(() => {
    // console.log(data);
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  return (
    <>
      <div className="heroBanner">
        {/* banner */}
        {!loading && (
          <div className="backdropImage">
            <Img imgSrc={background} />
          </div>
        )}
        <div className="opacityLayer"></div>
        {/* banner */}

        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            {/* search box */}
            <div className="searchInput">
              <input
                id="searchInput"
                type="text"
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for a movie, tv show, person..."
                onKeyUp={searchQueryHandler}
              />
              <button
                id="searchBtn"
                onClick={e => searchQueryHandler(e.target.id)}
              >
                Search
              </button>
            </div>
            {/* search box */}
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};

export default HeroBanner;
