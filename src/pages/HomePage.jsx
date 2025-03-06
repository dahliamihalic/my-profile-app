import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { useState, useEffect, useReducer, useLayoutEffect } from "react";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import { initialState, homeReducer } from "../reducers/homeReducer";
import useHomepageAPI from "../hooks/homepageAPI";


const HomePage = () => {
  const { titles, title, search, profiles, page, count, dispatch, handleTitleChange, handleSearchChange, handleClear } = useHomepageAPI();

  const buttonStyle = {
    border: "1px solid #ccc",
  };

  useLayoutEffect(() => {
    document.title = "Home Page";
  }
    , []);

  return (
    <Wrapper>
      <h1>Profile App</h1>
      <div className={styles["filter-wrapper"]}>
        <div className={styles["filter--select"]}>
          <label htmlFor="title-select">Select a title:</label>
          <select id="title-select" onChange={handleTitleChange} value={title}>
            <option value="">All</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["filter--search"]}>
          <label htmlFor="search">Search by name:</label>
          <input
            type="text"
            id="search"
            onChange={handleSearchChange}
            value={search}
          />
        </div>
        <button onClick={handleClear} style={buttonStyle}>
          <span>Reset</span>
        </button>
      </div>
      <div className={styles["profile-cards"]}>
        {profiles.map((profile) => (
          <Link to={`/profile/${profile.id}`} key={profile.id}>
            <Card key={profile.id} {...profile} />
          </Link>
        ))}
      </div>
      {count === 0 && <p>No profiles found!</p>}
      {count > 10 && (
        <div className={styles["pagination"]}>
          <button onClick={() => dispatch({ type: "SET_PAGE", payload: page + 1 })} disabled={page === 1}>
            <span className="sr-only">Previous</span>
          </button>
          <span>
            {page}/{Math.ceil(count / 10)}
          </span>
          <button
            onClick={() => dispatch({ type: "SET_PAGE", payload: page + 1 })}
            disabled={page >= Math.ceil(count / 10)}
          >
            <span className="sr-only">Next</span>
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default HomePage;