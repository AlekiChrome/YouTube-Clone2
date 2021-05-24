import React, { useState } from "react";
import { Link } from "react-router-dom";
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import SearchIcon from '@material-ui/icons/Search';
import "./Header.css";

const Header = () => {

    const [inputSearch, setInputSearch] = useState("");

    return (
        // Logo Image and Home Link
        <div className="header">
            <Link to ="/">
                <img
                    className="youtube-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png"
                    alt="YouTube logo"
                />
            </Link>

            {/* Search Input Section */}
            <div className="search-bar">
                <input type="text" 
                        onChange={(e) => setInputSearch(e.target.value)} 
                        value={inputSearch} />
                <Link to={`/search/${inputSearch}`}>
                    <SearchIcon className="material-searchicon" />
                </Link>
            </div>

            {/* About Links and Path */}
            <div className="icon-links">
            <a href="https://github.com/kathypurry"
                  target="_blank"
                  rel="noreferrer">
                <img
                    className="github-icon inverted"
                    src="https://avatars.githubusercontent.com/u/21033013?v=4"
                    alt=""
                />
            </a>
            <a href="https://github.com/AlekiChrome"
                  target="_blank"
                  rel="noreferrer">
                <img
                    className="github-icon inverted"
                    src="https://avatars.githubusercontent.com/u/47721785?v=4"
                    alt=""
                />
            </a>

            <Link to="/About">
                <InfoSharpIcon />
            </Link>

        </div>
    </div>

    )
}

export default Header;