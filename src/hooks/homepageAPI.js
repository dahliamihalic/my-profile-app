import { useState, useEffect, useReducer, useLayoutEffect } from "react";
import { initialState, homeReducer } from "../reducers/homeReducer";

function useHomepageAPI() {

    const [state, dispatch] = useReducer(homeReducer, initialState);
    const { titles, title, search, profiles, page, count } = state;

    // get titles
    useEffect(() => {
        fetch("https://web.ics.purdue.edu/~omihalic/profile-app/get-titles.php")
            .then((res) => res.json())
            .then((data) => {
                //setTitles(data);
                dispatch({ type: "SET_TITLES", payload: data.titles });
            });
    }, []);

    const handleTitleChange = (event) => {
        //setTitle(event.target.value);
        //setPage(1);
        dispatch({ type: "SET_TITLE", payload: event.target.value });
        dispatch({ type: "SET_PAGE", payload: 1 });
    };

    const handleSearchChange = (event) => {
        //  setSearch(event.target.value);
        //  setPage(1);
        dispatch({ type: "SET_SEARCH", payload: event.target.value });
        dispatch({ type: "SET_PAGE", payload: 1 });
    };
    //fetch the data from the server
    useEffect(() => {
        fetch(
            `https://web.ics.purdue.edu/~omihalic/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`
        )
            .then((res) => res.json())
            .then((data) => {
                //setProfiles(data.profiles);
                //setCount(data.count);
                //setPage(data.page);
                dispatch({ type: "FETCH_DATA", payload: data });
            });
    }, [title, search, page]);
    //clear the title and search
    const handleClear = () => {
        //setTitle("");
        //setSearch("");
        //setPage(1);
        dispatch({ type: "RESET" });
    };

    return { titles, title, search, profiles, page, count, dispatch, handleTitleChange, handleSearchChange, handleClear };
}

export default useHomepageAPI;