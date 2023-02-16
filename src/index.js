import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { GalleryApiService } from './galleryApiService';
import {LoadMoreBtn} from './LoadMoreBtn'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

const galleryApiService = new GalleryApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', addNewPhotos)

function onSubmit(eve) {
  eve.preventDefault();
  const value = eve.currentTarget.elements.searchQuery.value.trim();

  galleryApiService.searchValue = value;
 
  galleryApiService.resetPage();
  clearGallery();
  addNewPhotos();
}

async function addNewPhotos(eve) {
  loadMoreBtn.hide()
  galleryApiService.nextPage()
   try {
    const photos = await galleryApiService
      .getPhotos();
    if (photos.hits.length === 0)
       throw new Error('No data');
    console.log(photos);
     markup = photos.hits.map(createGallery).join('');
    updateGallery(markup);
     initLightbox();
     loadMoreBtn.show();
  } catch (err) {
    return onError(err);
  }
} 

function updateGallery(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  gallery.innerHTML = "";
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
  lightbox.refresh();
}

function onError(err) {
  console.error(err);
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  loadMoreBtn.hide()
}
