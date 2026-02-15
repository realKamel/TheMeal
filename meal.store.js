"use strict";
import { RenderUI } from "./main.js";

export const apiState = {
  data: null,
  isLoading: false,
  error: null,
};

const createMealStore = (apiState) => {
  let state = apiState;
  // const listeners = new Set(); // set prevents duplicate

  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState };
      RenderUI();
      // listeners.forEach((listener) => listener(state));
    },
    // subscribe: (listener) => {
    //   listeners.add(listener);
    //   return () => listeners.delete(listener);
    // },
  };
};

export const mealStore = createMealStore(apiState);
