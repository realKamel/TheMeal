"use strict";
import { mealStore } from "./meal.store.js";
const apiUrl = "https://www.themealdb.com/api/json/v1/1/";
// DONE Search meal by name
// DONE Lookup full meal details by id

// DONE List all meal categories
// TODO List all Categories, Area, Ingredients
// Done Filter by main ingredient
// Done Filter by Category
// DONE Filter by Area

// Meal Thumbnail Images
// Add /preview to the end of the meal image URL
// /images/media/meals/llcbn01574260722.jpg/small
// /images/media/meals/llcbn01574260722.jpg/medium

// Ingredient Thumbnail Images
// URL's match the ingredient name with an underscore for any spaces.

// Search meal by name
export async function GetByMealName(mealName) {
  if (!mealName) {
    throw new Error("the Meal Name isn't given");
  }

  try {
    mealStore.setState({ isLoading: true });

    const response = await fetch(`${apiUrl}search.php?s=${mealName}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    mealStore.setState({ data: result.meals, isLoading: false });
  } catch (error) {
    console.error(error.message);
    mealStore.setState({ error: error.message });
  } finally {
    mealStore.setState({ isLoading: false });
  }
}

//Random meal
export async function GetRandomMeal() {
  try {
    // mealStore.setState();
    mealStore.setState({ isLoading: true, error: null });
    const response = await fetch(`${apiUrl}random.php`);

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const result = await response.json();
    mealStore.setState({ data: result.meals, isLoading: false });
  } catch (error) {
    // console.error(error?.message);
    mealStore.setState({ error: error.message });
  } finally {
    mealStore.setState({ isLoading: false });
  }
}

// Lookup a single random meal
export async function GetMealById(id) {
  if (!id) {
    throw new Error("the Meal Id isn't given");
  }

  try {
    mealStore.setState({ isLoading: true });

    const response = await fetch(`${apiUrl}lookup.php?i=${id}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    mealStore.setState({ data: result.meals, isLoading: false });
  } catch (error) {
    console.error(error.message);
    mealStore.setState({ error: error.message });
  } finally {
    mealStore.setState({ isLoading: false });
  }
}

// List all meal categories
export async function GetAllCategories() {
  try {
    mealStore.setState({ isLoading: true });
    let response = await fetch(`${apiUrl}categories.php`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    mealStore.setState({
      data: result.categories || result.meals,
      isLoading: false,
    });
  } catch (error) {
    console.error(error.message);
    mealStore.setState({ error: error.message });
  } finally {
    mealStore.setState({ isLoading: false });
  }
}

// Filter by main ingredient
export async function GetMealsByIngredient(ingredient) {
  if (!ingredient) {
    throw new Error("the Meal ingredient isn't given");
  }

  try {
    mealStore.setState({ isLoading: true });

    const response = await fetch(`${apiUrl}filter.php?i=${ingredient}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    mealStore.setState({ data: result.meals, isLoading: false });
  } catch (error) {
    console.error(error.message);
    mealStore.setState({ error: error.message });
  } finally {
    mealStore.setState({ isLoading: false });
  }
}

export async function GetMealsByCategory(category) {
  if (!category) {
    throw new Error("the Meal Category isn't given");
  }

  try {
    mealStore.setState({ isLoading: true });

    const response = await fetch(`${apiUrl}filter.php?c=${category}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    mealStore.setState({ data: result.meals, isLoading: false });
  } catch (error) {
    console.error(error.message);
    mealStore.setState({ error: error.message });
  } finally {
    mealStore.setState({ isLoading: false });
  }
}

// Filter by Area
export async function GetMealsByArea(area) {
  if (!area) {
    throw new Error("the Meal area isn't given");
  }

  try {
    mealStore.setState({ isLoading: true });

    const response = await fetch(`${apiUrl}filter.php?a=${area}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    mealStore.setState({ data: result.meals, isLoading: false });
  } catch (error) {
    console.error(error.message);
    mealStore.setState({ error: error.message });
  } finally {
    mealStore.setState({ isLoading: false });
  }
}
