"use strict";

const api_key = "fcac2f91ff08505ab726c21754e10ec8";
const imageBaseURL = "https://image.tmdb.org/t/p/";

const fetchDataFromServer = function (url, callback, optionalParam) {
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      callback(data, optionalParam);
    });
};

export { imageBaseURL, api_key, fetchDataFromServer };
