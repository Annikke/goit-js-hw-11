import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { GalleryApiService } from './galleryApiService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

const galleryApiService = new GalleryApiService();

form.addEventListener('submit', onSubmit);

function onSubmit(eve) {
  eve.preventDefault();
  const value = eve.currentTarget.elements.searchQuery.value.trim();

  galleryApiService.searchValue = value;
  if (value.length === 0) return;

  return galleryApiService
    .getPhotos()
    .then(photos => {
      if (photos.hits.length === 0) throw new Error('No data');
      console.log(photos);
      markup = photos.hits.map(createGallery).join('');
      updateGallery(markup);
      initLightbox();
    })
    .catch(onError);
}

function updateGallery(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function createGallery({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <div class="photo-card">
  <a class="gallery-item" href=${largeImageURL}> 
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes </b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views </b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments </b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads </b>
      <span>${downloads}</span>
    </p>
  </div>
</div>
    `;
  
}

function initLightbox() {
  const lightbox = new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function onError(err) {
  console.error(err);
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
