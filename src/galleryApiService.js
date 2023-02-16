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
          page: this.page,
          per_page: 40,
        },
      })

      .then(response => response.data)
      // .then((data)=> {
      //   this.nextPage();
      //   return data;
      // })
  }

  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}

export { GalleryApiService };
