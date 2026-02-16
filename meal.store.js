"use strict";
import { RenderUI } from "./main.js";

const apiState = {
  data: null,
  isLoading: false,
  error: null,
  selectedElementId: null,
};

const createMealStore = (apiState) => {
  let state = apiState;

  return {
    getState: () => state,
    setState: (newState) => {
      const isDifferent = Object.keys(newState).some(
        (key) => state[key] !== newState[key],
      );
      if (isDifferent) {
        state = { ...state, ...newState };
        RenderUI();
      }
    },
  };
};

export const mealStore = createMealStore(apiState);
