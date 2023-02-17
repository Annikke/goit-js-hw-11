import axios from 'axios';

const ENDPOINT = `https://pixabay.com/api/`;

class GalleryApiService {
  constructor() {
    this.page = 1;
    this.searchValue = '';
  }

  async getPhotos() {
    const response = await axios.get(ENDPOINT, {
      params: {
        key: '33667128-b2367e9315dff10559bb3c4cd',
        q: this.searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: 40,
      },
    });
    this.nextPage();
    return response.data;
  }

  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}

export { GalleryApiService };
