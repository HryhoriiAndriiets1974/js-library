// import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації
import SimpleLightbox from "./index.js";
// Додатковий імпорт стилів
// import "simplelightbox/dist/simple-lightbox.min.css";
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const axios = require('axios');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: "alt",
  captionDelay: 1000,
});
