import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { GalleryApiService } from './galleryApiService';
import { LoadMoreBtn } from './LoadMoreBtn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

const galleryApiService = new GalleryApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

let totalPhotos = 0;

form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', addNewPhotos);

function onSubmit(eve) {
  eve.preventDefault();
  const value = eve.currentTarget.elements.searchQuery.value.trim();
  galleryApiService.searchValue = value;
  galleryApiService.resetPage();
  clearGallery();
  totalPhotos = 0;
  addNewPhotos();
}

async function addNewPhotos() {
  loadMoreBtn.hide();
  try {
    const photos = await galleryApiService.getPhotos();
    if (photos.hits.length === 0) throw new Error('No data');
    if (gallery.childNodes.length < 1)
      Notify.success(`Hooray! We found ${photos.totalHits} images.`);
    markup = photos.hits.map(createGallery).join('');
    updateGallery(markup);
    initLightbox();
    loadMoreBtn.show();
    totalPhotos += photos.hits.length;
    if (totalPhotos >= photos.totalHits || totalPhotos === 0) {
      loadMoreBtn.hide();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
    console.log(photos);
    console.log(totalPhotos);
  } catch (err) {
    return onError(err);
  }
}

function updateGallery(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  gallery.innerHTML = '';
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
  loadMoreBtn.hide();
}
