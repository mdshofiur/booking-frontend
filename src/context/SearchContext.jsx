import { useReducer } from "react";
import { createContext } from "react";

const INITTAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITTAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITTAL_STATE;
    default:
      return state;
  }
};

export const SearchConntextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITTAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
