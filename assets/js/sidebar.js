"use strict";
import { fetchDataFromServer, api_key } from "./api.js";
export function sidebar() {
  const genreList = {};

  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }
      genreLink();
    }
  );

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML = `<div class="sidebar-list">
      <p class="title">Genre</p>
    </div>
    <div class="sidebar-list">
      <p class="title">Language</p>
      <a href="./movie-list.html" class="sidebar-link" onclick='getMovieList("with_original_language=en", "English")'  menu-close>English</a>
      <a href="./movie-list.html" class="sidebar-link" onclick='getMovieList("with_original_language=ko", "Korean")'  menu-close>Korean</a>
      <a href="./movie-list.html" class="sidebar-link" onclick='getMovieList("with_original_language=uk", "Ukrainian")' menu-close>Ukrainian</a>
      <a href="./movie-list.html" class="sidebar-link" onclick='getMovieList("with_original_language=fr", "French")' menu-close>French</a>
      <a href="./movie-list.html" class="sidebar-link" onclick='getMovieList("with_original_language=de", "German")'  menu-close>German</a>
      <a href="./movie-list.html" class="sidebar-link" onclick='getMovieList("with_original_language=es", "Spanish")'  menu-close>Spanish</a>
    </div>
    <div class="sidebar-footer">
      <p>It was made using this video https://youtube.com/@codewithsadee</p>
      <img
        src="./assets/images/tmdb-logo.png"
        alt="the movie database logo
"
        width="130"
        height="17"
      />
    </div>`;

  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "./movie-list.html");
      link.setAttribute("menu-close", "");
      // console.log(1);
      link.setAttribute(
        "onclick",
        `getMovieList("with_genres=${genreId}", "${genreName}")`
      );
      link.textContent = genreName;

      sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
    }

    const sidebar = document.querySelector("[sidebar]");
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };

  const toggleSidebar = function (sidebar) {
    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarToogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelector("[overlay]");

    addEventsOnElements(sidebarToogglers, "click", function () {
      sidebar.classList.toggle("active");
      console.log(1);
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });
    addEventsOnElements(sidebarClose, "click", function () {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };
}
