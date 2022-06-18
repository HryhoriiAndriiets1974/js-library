import { getRefs } from './get-refs';
import axios from "axios";

import ApiService from './api';
import { onClickToAddToQueueBtn } from './modal-movie';
import noImg from '../images/no-poster-available.jpeg';
import { genresAddOthers } from './genres';
import { paginationTotalItems } from './pagination';

const watchedBtn = document.querySelector('.js-watched-btn');
const queuedBtn = getRefs().queueBtn;
// const libraryPage = document.querySelector('.films__library__page')
// const homeButton = getRefs().homeBtn;
const container = getRefs().gallery



watchedBtn.addEventListener('click', onWatchedBtnClick);
queuedBtn.addEventListener('click', onQueuedBtnClick);
// homeButton.addEventListener('click', onHomeBtnClickn);

// function onHomeBtnClickn(evt) {
//     libraryPage.classList.add('js-is-hidden');
// }
// let arrayMovies = JSON.parse(localStorage.getItem('watched'));
// paginationTotalItems(arrayMovies.length);

export function onWatchedBtnClick() {
    getRefs().pagination.classList.add('pagination-off');
    processingStorage('watched', 1);
    let arrayMovies = JSON.parse(localStorage.getItem('watched'));
    paginationTotalItems(arrayMovies.length);
    localStorage.removeItem('markerBy');
    localStorage.setItem('markerBy', 'watched');
    // перемкнути видимість кнопок
}

export function onQueuedBtnClick(evt) {
  getRefs().pagination.classList.add('pagination-off');
  processingStorage('queue', 1);
  let arrayMovies = JSON.parse(localStorage.getItem('queue'));
  paginationTotalItems(arrayMovies.length);
  localStorage.removeItem('markerBy');
  localStorage.setItem('markerBy', 'queue');
  // перемкнути видимість кнопок
}

export function processingStorage(value, i) {
  container.innerHTML = "";
  let cards = JSON.parse(localStorage.getItem(value));
  if (!cards) return;
  if (cards.length >20) {
    // paginationTotalItems(cards.length);
    getRefs().pagination.classList.remove('pagination-off');
  }

  let pageCards = cards.slice( i * 20 - 20, i * 20);

    const markup = pageCards.map(({ original_title, poster_path, release_date, genre_ids, vote_average }) => {

    let genres = renderGenres(genre_ids);

    return `<li class="films__list">
    <a class="films__id" data-id="">
<div class="film__photo__card">

<picture class="films__pictures__thumb">


    <source class="lazy_image" media="(min-width: 1200px)"
    srcset=""  type="image/jpeg" width="310" height="450"  data-src="https://themoviedb.org/t/p/w500${poster_path} 1x,https://themoviedb.org/t/p/w500${poster_path} 2x">


    <source class="lazy_image" media="(min-width: 768px)"
     srcset=""  type="image/jpeg" width="335" height="455"  data-src="https://themoviedb.org/t/p/w500${poster_path} 1x,https://themoviedb.org/t/p/w500${poster_path} 2x">


    <source class="lazy_image" media="(max-width: 767px)"
     srcset=""  type="image/jpeg" width="280" height="400"  data-src="https://themoviedb.org/t/p/w500${poster_path} 1x,https://themoviedb.org/t/p/w500${poster_path} 2x">


                <img
                    src="https://themoviedb.org/t/p/w500${posterPath(poster_path)}"
                    alt="${original_title}"
                    loading="lazy"
                    class="film__picture"
                />
            </picture>
<div class="film__info">


            <div class="film__info">
                <h2 class="film__title">${original_title}</h2>
                <div class="film__description">
                  <ul class="film__genres__list">
                 ${genres}
                  </ul>
                  <p class="film__release__date">${releaseDate(release_date)}</p>
                  <p class="film__vote">${vote_average}</p>
                </div>
            </div>
</div>
</div>
</a></li>
    `}).join('');
container.insertAdjacentHTML("beforeend", markup);
getRefs().pagination.classList.remove('pagination-off');
}

function posterPath(poster) {
  if (poster === null) {
    return noImg;
  }
  return `https://image.tmdb.org/t/p/w500${poster}`;
}

 function renderGenres(genre_ids) {
  return genresAddOthers(genre_ids)
    .map(genre => `<li class="movie-genres">${genre}</li>`)
    .join(' ,');
}

 function releaseDate(year) {
    if (!year)  'No data';
    return year.slice(0, 4);
}
