

export const initialState = {
    titles: [],
    profiles: [],
    search: "",
    title: "",
    page: 1,
    count: 0,
};

export const homeReducer = (state, action) => {
    switch (action.type) {
        case "SET_SEARCH":
            return {
                ...state,
                search: action.payload,
            };
        case "SET_TITLE":
            return {
                ...state,
                title: action.payload,
            };
        case "SET_PAGE":
            return {
                ...state,
                page: action.payload,
            };
        case "SET_TITLES":
            return {
                ...state,
                titles: action.payload,
            };
        case "SET_PROFILES":
            return {
                ...state,
                profiles: action.payload,
            };
        case "SET_COUNT":
            return {
                ...state,
                count: action.payload,
            };
        case "FETCH_DATA":
            return {
                ...state,
                profiles: action.payload.profiles,
                count: action.payload.count,
                page: action.payload.page,
            };
        case "RESET":
            return {
                ...state,
                search: "",
                title: "",
                page: 1,
            };
        default:
            return state;
    }
}