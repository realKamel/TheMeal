"use strict";

import { mealStore } from "../meal.store.js";

export function MealComponent() {
  const ingredientMeasure = [];
  const meanId = mealStore.getState().selectedElementId;
  // if (!meanId) {
  //   throw new Error("Mean Id is Expected");
  // }
  if (mealStore.getState().isLoading) {
    return `<div class="loader">Loading...</div>`;
  }

  const data = mealStore.getState().data ? mealStore.getState().data[0] : null;
  if (!data) {
    return `<div class="error">No meal details found.</div>`;
  }

  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];
    ingredientMeasure.push({ ingredient, measure });
  }
  // console.log(data);
  // console.log(ingredientMeasureMap);

  let ingredientMeasureHtml = ``;
  for (const element of ingredientMeasure) {
    console.log(element);
    if (element.ingredient) {
      ingredientMeasureHtml += /*html*/ `
        <div class="row border-round p-2">
        <span class="col-2 border-round">${element.ingredient}: </span>
        <span class="col-10 border-round">${element.measure}</span>
        </div>`;
    }
  }
  // console.log(ingredientMeasure);
  const html = /*html*/ `
      <div class="container">
        <div class="row">
          <div class="col-4 p-4">
            <img class="mealComponents__figure" src="${data.strMealThumb}" alt="${data.strMealAlternate}">
           ${
             data.strTags
               ? `
                <span>Tags: </span>
              ${data.strTags
                .split(",")
                .map((t) => `<span class="tag">${t.trim()}</span>`)
                .join("")}`
               : "No Tags Is Provided"
           }
              <div class="d-flex flex-wrap">
                <span class="tag gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" 
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-funnel-icon lucide-funnel">
                  <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"/>
                </svg>
                Category: ${data.strCategory}
              </span>
                <span class="tag gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                </svg>
                Area: ${data.strArea}</span>
                <span class="tag gap-1">
                  Source: <a target="_blank" href="${data.strSource}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-icon lucide-link">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                  </a></span>
                 <span class="tag gap-1">
                    Youtube:
                    <a target="_blank" href="${data.strYoutube}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                      stroke-width="2" stroke-linecap="round" 
                      stroke-linejoin="round" 
                      class="lucide lucide-youtube-icon lucide-youtube">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                      <path d="m10 15 5-3-5-3z"/>
                    </svg>
                    </a>
                  </span>
              </div>
          </div>
          <div class="col-8">
            <h1 class="title">
              ${data.strMeal}
            </h4>
            <div class="row">
              <h2>Ingredients</h2>
              <div class="meal_tags">
                ${ingredientMeasureHtml}
              </div>
             </div>
            <div class="row">
              <h2>Instructions</h2>
              <p>${data.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  return html;
}
