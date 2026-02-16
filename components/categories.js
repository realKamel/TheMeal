"use strict";

import { GetAllCategories, GetMealsByCategory } from "../api.js";
import { changeRoute } from "../main.js";
import { mealStore } from "../meal.store.js";
let isFetched = false;
export function categoriesComponent() {
  if (!isFetched) {
    GetAllCategories();
    isFetched = true;
  }

  document.addEventListener("click", (event) => {
    const detailBtn = event.target.closest("[data-category-name]");
    if (detailBtn) {
      const categoryName = detailBtn.dataset.categoryName;
      console.log(detailBtn);
      console.log(categoryName);
      GetMealsByCategory(categoryName);
      changeRoute("search");
    }
  });

  if (mealStore.getState().isLoading) {
    return `<div class="loader">Loading...</div>`;
  }
  const data = mealStore.getState().data;
  if (!data) {
    return `<div class="error">No Categories are found.</div>`;
  }
  let contentHtml = ``;
  data.forEach((c) => {
    contentHtml += /*html*/ `
        <div class="col-3">
          <div class="card">
              <a
              class="card-image-link">
              <img class="card-image" src="${c.strCategoryThumb}" 
              alt="${c.strCategory}" 
              />
              </a>
              <div class="card-content">
                  <a>
                      <h5 class="card-title">${c.strCategory}</h5>
                  </a>
                  <button data-category-name="${c.strCategory}" class="card-button search-Components__view-detail-button">
                      View Details
                  </button>
              </div>
          </div>
        </div>
  `;
  });
  const html = /*html*/ `
        <section class="container">
          <div class="row p-2 g-1">
            ${contentHtml}
          </div>
        </section>
    `;
  return html;
}
