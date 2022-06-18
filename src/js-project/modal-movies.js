
import * as basicLightbox from 'basiclightbox'
import { getRefs } from './get-refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './api';


const apiMainMovie = new ApiService();
const container = getRefs().gallery;
container.addEventListener('click', onContainerClick);


// let ADD_TO_WATCHED_FILM = "add-to-watched-film";
// let ADD_TO_QUEUE_FILM = "add-to-queue-film";


// let currentMovie = '';
const addToWachedFilms = [];
const addToQueueFilms = [];
export function onContainerClick(event) {
  const parent = event.target.closest('li').firstChild;
  const { id } = parent.dataset;
  if (!parent) {
    return;
  }

  event.preventDefault();
  window.addEventListener('keydown', onImageClose);

  apiMainMovie.getMainMovie(id).then(({ title, genres, date, poster, about, populanty, vote, votes,id }) => {
    const ganreList = genres.map((ganre) => ganre.name).join(', ');
    const genre_ids = genres.map((ganre) => ganre.id);

   const currentMovie = basicLightbox.create(`
    <div class="current-movie">
        <img  src="https://image.tmdb.org/t/p/w500${poster}" class="current-movie__img">
        <div class="current-movie__info">

        <h2 class="current-movie__title"> ${event.target.alt}</h2>
        <p class="current-movie__votes"> Vote / Votes
          <span class="current-movie__vote-data">${vote}</span>
          <span class="current-movie__votes-data">${votes}</span>
        </p>
        <p class="current-movie__popularity"> Popularity <span class="current-movie__popularity-data">${populanty}</span></p>
        <p class="current-movie__original-title"> Original Title <span class="current-movie__original-title-data">${title}</span></p>
        <p class="current-movie__genre"> Genre
          <span class="current-movie__genre-data">${ganreList}</span>
        </p>
        <div class="current-movie__about-section">
          <h3 class="current-movie__about"> ABOUT</h3>
          <p class="current-movie__about-data"> ${about} </p>
        </div>

        <div class="current-movie__btn-container">
        <button type = "button" class="current-movie_btn-add-to-watched">ADD TO WATCHED</button>
        <button type = "button" class="current-movie_btn-add-to-queue">ADD TO QUEUE</button>
      </div>


    </div>`
      );

  currentMovie.show();
  const btnAddToWatched = document.querySelector(".current-movie_btn-add-to-watched");
  const btnAddToQueue = document.querySelector(".current-movie_btn-add-to-queue");

  const currentMovieInfo = { id: id, original_title: title, release_date: date, poster_path: poster, genre_ids: genre_ids, vote_average: vote,
        vote_count: votes };
    const dataWatchinMovie = JSON.parse(localStorage.getItem("watched")) || addToWachedFilms;
    const dataQueueMovie = JSON.parse(localStorage.getItem("queue")) || addToQueueFilms;



    btnAddToWatched.addEventListener("click", (() => {
      const unicId = dataWatchinMovie.map(({ id }) => {
          if (id === currentMovieInfo.id) {
            return true
          }
      });
        if (unicId.find((item)=> item===true)) {
         return Notify.warning('You have already added this movie to Watched')
        }
        Notify.success('You added this movie to Watched')

        dataWatchinMovie.push(currentMovieInfo);
        localStorage.setItem('watched', JSON.stringify(dataWatchinMovie));
    }));


    btnAddToQueue.addEventListener("click", (() => {


      const unicIdQ = dataQueueMovie.map(({ id }) => {
        if (id === currentMovieInfo.id) {
            return true;
          }
      });

        if (unicIdQ.find((item)=> item===true)) {
        return Notify.warning('You have already added this movie to Queue')
        }
        Notify.success('You added this movie to Queue')
        dataQueueMovie.push(currentMovieInfo);
        localStorage.setItem('queue', JSON.stringify(dataQueueMovie));
    }));

  });
}

  function onImageClose(event) {
    if (event.code === 'Escape') {
      currentMovie.close();
      window.removeEventListener('keydown', onImageClose);
    }
  }
