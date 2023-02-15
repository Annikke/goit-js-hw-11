import axios from 'axios';

const ENDPOINT = `https://pixabay.com/api/`;

class GalleryApiService {
  constructor() {
    this.page = 1;
    this.searchValue = '';
  }

  getPhotos() {
    // const URL = `${ENDPOINT}?key=33667128-b2367e9315dff10559bb3c4cd&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true`;
    return axios
      .get(ENDPOINT, {
        params: {
          key: '33667128-b2367e9315dff10559bb3c4cd',
          q: this.searchValue,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
        },
      })

      .then(response => response.data);
  }
}

export { GalleryApiService };
