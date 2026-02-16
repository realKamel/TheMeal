"use strict";
import {
  GetMealById,
  GetMealsByArea,
  GetMealsByCategory,
  GetMealsByIngredient,
  GetByMealName,
} from "../api.js";
import { changeRoute } from "../main.js";
import { mealStore } from "../meal.store.js";
export function SearchComponent() {
  document.addEventListener("click", (event) => {
    const detailBtn = event.target.closest("[data-search-id]");
    if (detailBtn) {
      const mealId = detailBtn.dataset.searchId;
      console.log(detailBtn);
      console.log(mealId);
      GetMealById(mealId);
      changeRoute("meal");
    }
  });
  document.addEventListener("click", (event) => {
    console.log(event);
    if (event.target && event.target.id == "searchComponent__button") {
      const option = document.getElementById("selectOption").value;
      let value = document.getElementById("searchInput").value;
      console.log(option);
      console.log(value.trim());
      if (value.trim()) {
        switch (option) {
          case "name":
            GetByMealName(value);
            break;
          case "ingredient":
            value = "".split(" ").join("_");
            GetMealsByIngredient(value);
            break;
          case "category":
            GetMealsByCategory(value);
            break;
          case "area":
            GetMealsByArea(value);
            break;
        }
      }
    }
  });

  let searchResultHtml = ``;
  // let arr = [].forEach(e=>{})
  if (mealStore.getState().isLoading) {
    searchResultHtml = `<div class="loader">Loading...</div>`;
  }

  const data = mealStore.getState().data;
  console.log(data);
  if (!data) {
    searchResultHtml = `<div class="error">No meal details found.</div>`;
  }
  if (data && data.length > 0) {
    data?.forEach((r) => {
      searchResultHtml += /*html*/ `
                      <div class="col-3">
                          <div class="card">
                              <a
                              class="card-image-link">
                              <img
                              class="card-image"
                              src="${r.strMealThumb}" 
                              alt="${r.strMealAlternate}" 
                              />
                              </a>
                              <div class="card-content">
                                  <a>
                                      <h5 class="card-title">${r.strMeal}</h5>
                                  </a>
                                  <button
                                  data-search-id="${r.idMeal}" 
                                  class="card-button search-Components__view-detail-button">
                                      View Details
                                  </button>
                              </div>
                          </div>
                      </div>
            `;
    });
  }

  const html = /*html*/ `
    <div class="container p-2 searchComponent__container">
        <section class="row searchComponent__search_section">
            <div class="col-4">
                <div class="row gap-1">
                    <input
                    placeholder="Search Word..."
                    required minlength="3"
                    minlength="20"
                    type="search"
                    class="border-radius"
                    id="searchInput">
                    <select name="option" id="selectOption">
                        <option value="name">Default</option>
                        <option value="ingredient" >Ingredient</option>
                        <option value="category">Category</option>
                        <option value="area">Area</option>
                    </select>
                    <button id="searchComponent__button" class="searchComponent__button">Search</button>
                </div>
                
            </section>
            <section class="searchComponent__result_section container p-2">
            <div class="row">
               ${searchResultHtml}
                </div>
            </div>
            </section>
        </div>
    </div>`;
  return html;
}
