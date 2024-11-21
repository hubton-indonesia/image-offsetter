import { ImageOffsetter } from "../index.js";

new ImageOffsetter({
  containerAnchor: document.querySelector('.js-container-anchor'),
  imageAnchor: document.querySelector('.js-image-anchor'),
  image: document.querySelector('.js-image'),
  on: {
    offsetChange: (offset) => console.log({ offset })
  }
})