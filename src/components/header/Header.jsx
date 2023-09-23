import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";

import logo from "../../assets/logo.svg";
import ContentWrapper from "../contentWrapper/ContentWrapper";

// icons
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrolly, setLastScrolly] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const searchQueryHandler = e => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = type => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }

    setMobileMenu(false);
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrolly) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrolly(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrolly]);

  return (
    <header className={`header ${show} ${mobileMenu ? "mobileView" : ""}`}>
      <ContentWrapper>
        {/* menu  */}
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="app logo" />
        </div>

        <ul className="menuItems">
          <li className={`menuItem`} onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            Tv Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        {/* menu  */}
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie, tv show ..."
                onChange={e => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
