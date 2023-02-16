class LoadMoreBtn {
  constructor({ selector, isHidden }) {
    this.button = this.getButton(selector);
    if (isHidden) this.hide();
    else this.show();
  }
  getButton(selector) {
    return document.querySelector(selector);
  }

  hide() {
    this.button.classList.add('hidden');
  }

  show() {
    this.button.classList.remove('hidden');
    }
}

export { LoadMoreBtn };
