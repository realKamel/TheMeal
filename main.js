"use strict";
import { categoriesComponent } from "./components/categories.js";
import { HomeComponent } from "./components/home.js";
import { SearchComponent } from "./components/search.js";
import { MealComponent } from "./components/meal.js";

const routes = {
  home: HomeComponent,
  search: SearchComponent,
  categories: categoriesComponent,
  meal: MealComponent,
};
const links = [
  {
    id: "homeComponentLink",
    route: "home",
  },
  {
    id: "searchComponentLink",
    route: "search",
  },
  {
    id: "categoriesComponentLink",
    route: "categories",
  },
];
let selectedRoute = routes["home"];

export function changeRoute(route) {
  if (route in routes) {
    selectedRoute = routes[route];
  }
}

export function RenderUI() {
  const html = /*html*/ `
  <div class="container">
      <div class="row">
        <aside class="col-1 h-100dvh">
          <div class="row">
            <a id="homeComponentLink"
            class="logo cursor-pointer text-underline gap-1">
            <svg xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-icon lucide-utensils">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
          </svg>
            TheMeal
            </a>
            <a id="searchComponentLink"
            class="search cursor-pointer gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-search-icon lucide-search"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
              Search
            </a>
            <a id= "categoriesComponentLink"
            class="categories cursor-pointer text-align-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-logs-icon lucide-logs"
              >
                <path d="M3 5h1" />
                <path d="M3 12h1" />
                <path d="M3 19h1" />
                <path d="M8 5h1" />
                <path d="M8 12h1" />
                <path d="M8 19h1" />
                <path d="M13 5h8" />
                <path d="M13 12h8" />
                <path d="M13 19h8" />
              </svg>
              Categories
            </a>
          </div>
        </aside>
        <main class="col-11">
        ${selectedRoute()}
        </main>
      </div>
    </div>
`;
  const root = document.getElementById("root");
  root.innerHTML = html;
  addEventListenerForLinks(links);
}

RenderUI();

function addEventListenerForLinks(links) {
  links.forEach((link) => {
    document.getElementById(link.id).addEventListener("click", (e) => {
      e.preventDefault();
      selectedRoute = routes[link.route];
      RenderUI();
    });
  });
}
