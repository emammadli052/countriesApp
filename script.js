'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
////////////////////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.altSpellings[1]}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
        </div>
        </article>
        `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', `${msg}`);
};
///////////////////////////////////////////////////////////////////////
// //------------ XMLHttpRequest() ------------------//
// const getCountryAndNeighbor = function (country) {
//   // AJAX call country 1
//   let request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.response);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbor country (2)
//     const [neighbor] = data?.borders;
//     if (!neighbor) return;

//     // AJAX call country 2
//     let request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
//     request2.send();
//     request2.onload = function () {
//       const [data2] = JSON.parse(this.response);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     };
//   });
// };
// getCountryAndNeighbor('portugal');

///////////////////////////////////////////////////////////////////////
// ----------------Fetch API (fetch()) -----------------------/////
// fetch api does not get rid off callback functions, instead it gets rid
// off callback hell by returning promises
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0]?.borders[1];
      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data[0], 'neighbour'))
    .catch((err) => {
      console.error(`${err} 💣💣💣`);
      renderError(`Something went wrong 💣💣💣.... ${err.message}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  getCountryData('azerbaijan');
  countriesContainer.textContent = '';
});

getCountryData('asdjasdjasddj');
