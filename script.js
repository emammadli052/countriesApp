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

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       if (!response.ok)
//         throw new Error(`Country not found! ${response.status}`);
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       if (!data[0].hasOwnProperty('borders'))
//         throw new Error('No neighbor found');
//       const neighbour = data[0]?.borders[0];
//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       if (!response.ok)
//         throw new Error(`Country not found! ${response.status}`);
//       return response.json();
//     })
//     .then((data) => renderCountry(data[0], 'neighbour'))
//     .catch((err) => {
//       renderError(`Something went wrong 💣💣💣.... ${err.message}`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', () => getCountryData('australia'));

///////////////////////////////////////////////////////////////////////
// //-------------------------Challange 1----------------------------///
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
//     .then((response) => {
//       if (!response.ok) throw new Error('Problem with geocoding 😒😒😒');
//       return response.json();
//     })
//     .then((data) => {
//       const { city, country } = data;
//       if (!city || !country) throw new Error('Problem with fetching coords');
//       console.log(`You are in ${city}, ${country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${country}`);
//     })
//     .then((response) => {
//       if (!response.ok) throw new Error(`Response is not ok!`);
//       return response.json();
//     })
//     .then((data) => {
//       const [country] = data;
//       renderCountry(country);
//     })
//     .catch((err) => console.log(err.message))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };
// // Azerbaijan --- 40.48758,50.16334
// whereAmI(40.48758, 50.16334);
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);

/////////////////////////////////////////////////////////////////////////
// console.log('Test Start');
// setTimeout(() => {
//   console.log('0 sec timer');
// }, 0);
// Promise.resolve('Resolved Promise 1').then((res) => console.log(res));
// Promise.resolve('Resolve Promise 2').then((res) => {
//   for (let index = 0; index < 1000000000; index++) {}
//   console.log(res);
// });
// console.log('Test End');

/////////////////////////////////////////////////////////////////////////
// Promisifying -- converting callback based function into promises
// encapsulating any async behaviuor into promise
// const lotteryPromise = new Promise((resolve, reject) => {
//   console.log(`Lottery draw is happening 🔮`);
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You are the winner. Congratsss....😊'); // fullfilled promise
//     } else {
//       reject(new Error('You lost the loottery😥')); // rejected promise
//     }
//   }, 2000);
// });
// lotteryPromise
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err))
//   .finally(() =>
//     setTimeout(() => {
//       console.log(`Lottery finished!`);
//     }, 500)
//   );

// // Promisifying setTimeout
const wait = function (seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};
// wait(1)
//   .then(() => {
//     console.log('I waited for 1 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 3 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 4 seconds');
//   });

// Promise.resolve('Fulllfilled value').then((a) => console.log(a));
// Promise.reject(new Error('Rejected value')).catch((a) => console.error(a));

////////////////////////////////////////////////////////////////////
// // Promisfying functions
// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => resolve(position.coords),
//       (err) => reject(err)
//     );
//   });
// };

// getPosition()
//   .then((pos) => console.log(pos))
//   .catch((err) => console.error(err));

// const whereAmI = function () {
//   getPosition()
//     .then((response) => {
//       const { latitude: lat, longitude: lng } = response;
//       return fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
//     })
//     .then((response) => {
//       if (!response.ok) throw new Error('Problem with geocoding 😒😒😒');
//       return response.json();
//     })
//     .then((data) => {
//       const { city, country } = data;
//       if (!city || !country) throw new Error('Problem with fetching coords');
//       console.log(`You are in ${city}, ${country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${country}`);
//     })
//     .then((response) => {
//       if (!response.ok) throw new Error(`Response is not ok!`);
//       return response.json();
//     })
//     .then((data) => {
//       const [country] = data;
//       renderCountry(country);
//     })
//     .catch((err) => console.log(err.message))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };
// btn.addEventListener('click', whereAmI);

/////////////////////////////Challange 2///////////////////////////////
let currentImage;
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', () => {
      document.querySelector('.images').insertAdjacentElement('beforeend', img);
    });
    img.addEventListener('error', () => {
      reject('Errororoororrororooro');
    });
    resolve(img);
  });
};

const waitImage = function (seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

createImage(`img/img-1.jpg`)
  .then((img) => {
    console.log(`Image 1 loaded`);
    currentImage = img;
    return waitImage(3);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage(`img/img-2.jpg`);
  })
  .then((img2) => {
    console.log(`Image 2 loaded`);
    currentImage = img2;
    return waitImage(3);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage(`img/img-3.jpg`);
  })
  .then((img3) => {
    currentImage = img3;
    console.log(`Image 3 loaded`);
    return waitImage(4);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch((err) => {
    console.error(err);
  });
