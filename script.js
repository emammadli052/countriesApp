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

const renderError = (msg) =>
  countriesContainer.insertAdjacentText('beforeend', `${msg}`);
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
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found! ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      if (!data[0].hasOwnProperty('borders'))
        throw new Error('No neighbor found');
      const neighbour = data[0]?.borders[0];
      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found! ${response.status}`);
      return response.json();
    })
    .then((data) => renderCountry(data[0], 'neighbour'))
    .catch((err) => {
      renderError(`Something went wrong 💣💣💣.... ${err.message}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};
countriesContainer.style.opacity = 1;
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
// let currentImage;
// const createImage = function (imgPath) {
//   return new Promise((resolve, reject) => {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', () => {
//       document.querySelector('.images').insertAdjacentElement('beforeend', img);
//     });
//     img.addEventListener('error', () => {
//       reject('Errororoororrororooro');
//     });
//     resolve(img);
//   });
// };

// const waitImage = function (seconds) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// createImage(`img/img-1.jpg`)
//   .then((img) => {
//     console.log(`Image 1 loaded`);
//     currentImage = img;
//     return waitImage(3);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage(`img/img-2.jpg`);
//   })
//   .then((img2) => {
//     console.log(`Image 2 loaded`);
//     currentImage = img2;
//     return waitImage(3);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage(`img/img-3.jpg`);
//   })
//   .then((img3) => {
//     currentImage = img3;
//     console.log(`Image 3 loaded`);
//     return waitImage(4);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch((err) => {
//     console.error(err);
//   });

//////////////////////////////////////////////////////////////////////
// // Async await, consuming promises
// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => resolve(position.coords),
//       (err) => reject(err)
//     );
//   });
// };

// const whereAmI = async function () {
//   try {
//     // GeoLocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos;

//     // Reverse GeoCoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
//     if (!resGeo.ok) throw new Error('ResGeo is unknown');
//     const dataGeo = await resGeo.json();

//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error('Res is not ok');
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     renderError(`Something went wrong..... ${err.message} 😒😒😒`);

//     // Reject promise returned from async function
//     throw err;
//   }
// };
// console.log('1: I will get location');
// // const city = whereAmI();
// // console.log(city);
// whereAmI()
//   .then((city) => console.log(`2: Promise gec log oldu: ${city}`))
//   .catch((err) => console.error(`2: ${err.message}`))
//   .finally(() => console.log(`3: Finisihed`));

//////////////////////////////////////////////////////////////////////
// Running Promises in Parelel. Promise.All() promise combinator
const getJSON = async function (url, errorMsg = 'Errrrrrrrrrooorr') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errorMsg.message} ${errorMsg.status}`);
  return await response.json();
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    const promisesArray = [
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ];
    const data = await Promise.all(promisesArray);
    console.log(data);
    console.log(data.map((d) => d[0].capital));
  } catch (error) {
    console.error(error);
  }
};

// get3Countries('portugal', 'azerbaijan', 'germany');

//////////////////////////////////////////////////////////////////////
// // Other promise combinators
// // Promise.race()
// (async function () {
//   const promisesArray = [
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/turkey`),
//     getJSON(`https://restcountries.com/v3.1/name/sweden`),
//   ];
//   const res = await Promise.race(promisesArray);
//   console.log(res[0]);
// })();

//////////////////////////////////////////////////////////////////////
// // Promise.resolve('Resolved').then((data) => console.log(data));

// Promise.resolve(fetch(`https://restcountries.com/v3.1/name/italy`))
//   .then((res) => {
//     console.log(res);
//     return res.json();
//   })
//   .then((data) => {
//     const [country] = data;
//     console.log(...country.capital);
//   });

// const testFunc = async function () {
//   const response = await fetch(`https://restcountries.com/v3.1/name/italy`);
//   console.log(`Async function respomse: ${response}`);
//   const [data] = await response.json();
//   console.log(data);
//   console.log(`Async function data: ${data}`);
// };
// testFunc();

/////////////////////////////Challange 3///////////////////////////////
// convert challange 2 functionality to async/await
const images = [`img/img-1.jpg`, `img/img-2.jpg`, `img/img-3.jpg`];

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

const changeImagesAsync = async function (imgURL) {
  let currentImage;
  try {
    currentImage = await createImage(imgURL);
    await waitImage(3);
  } catch (error) {
    console.error(error.message);
  } finally {
    currentImage.style.display = 'none';
  }
};
const loadNPause = async function () {
  let currentImage;
  try {
    // Load img 1
    currentImage = await createImage(`img/img-1.jpg`);
    console.log('Image 1 Loaded.');
    await wait(3);
    currentImage.style.display = 'none';

    // Load img 2
    currentImage = await createImage(`img/img-2.jpg`);
    console.log('Image 2 Loaded.');
    await wait(3);
    currentImage.style.display = 'none';

    // Load img 3
    currentImage = await createImage(`img/img-3.jpg`);
    console.log('Image 3 Loaded.');
    await wait(3);
    currentImage.style.display = 'none';
  } catch (error) {
    console.error(error.message);
  }
};

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr?.map(async (img) => await createImage(img));
    console.log(imgs);
    const imgEl = await Promise.all(imgs);
    imgEl?.forEach((img) => img.classList.add('parallel'));
    console.log(imgEl);
  } catch (error) {
    console.log(error);
  }
};

loadAll(images);
