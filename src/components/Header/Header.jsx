import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.scss";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setShowSearch(false);
    }
  };

  const navHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }

    setMobileMenu(false);
    setShowSearch(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img
            src={logo}
            alt="Logo"
            onClick={() => {
              navigate("/");
              setShowSearch(false);
            }}
          />
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={() => navHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch
              size={22}
              onClick={() => setShowSearch(!showSearch)}
            />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch
            size={22}
            onClick={openSearch}
            style={{ cursor: "pointer" }}
          />
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => setMobileMenu(false)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <SlMenu onClick={openMobileMenu} style={{ cursor: "pointer" }} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyUp={searchQueryHandler}
                placeholder="Search for a movie or tv show..."
              />
            </div>
            <VscChromeClose
              onClick={() => setShowSearch(false)}
              className="closeMenu"
              size={20}
            />
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
