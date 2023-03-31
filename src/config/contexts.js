import { createContext, useReducer } from "react";
import { defaultState, reducer } from "./reducers";

export const GameContext = createContext([{}, () => {}]);

const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
