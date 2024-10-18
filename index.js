/**
 * @typedef ImageOffsetterParams
 * @property {HTMLDivElement} containerAnchor
 * @property {HTMLDivElement} imageAnchor
 * @property {HTMLImageElement} image
 * @property {'left'|'right'} pull
 */

/**
 * @example
 * ```html
 * <div class="container mx-auto">
 *  <div class="w-full js-container-anchor"></div>
 *  <div class="w-10/12 ml-auto">
 *    <div class="w-full js-image-anchor"></div>
 *    <img src="https://placehold.co/300" class="w-full h-auto js-image"></img>
 *  </div>
 * </div>
 * ```
 * ---
 * ```js
 * new ImageOffsetter({
 *   containerAnchor: document.querySelector('.js-container-anchor'),
 *   imageAnchor: document.querySelector('.js-image-anchor'),
 *   image: document.querySelector('.js-image'),
 * })
 * ```
 */
export class ImageOffsetter {
  MAX_WINDOW_WIDTH = 1728 //px

  containerAnchor
  imageAnchor
  image

  imageWidthOrigin
  containerWidth
  offset
  pull

  /**
   *
   * @param {ImageOffsetterParams} param0
   */
  constructor({ containerAnchor, imageAnchor, image, pull = 'right' }) {
    console.log('test')
    this.containerAnchor = containerAnchor
    this.imageAnchor = imageAnchor
    this.image = image
    this.pull = pull

    this.handleResize()
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    this.imageWidthOrigin = this.imageAnchor.clientWidth
    this.containerWidth = this.containerAnchor.clientWidth
    this.offset = (Math.min(this.MAX_WINDOW_WIDTH, window.innerWidth) - this.containerWidth) / 2

    this.image.style.minWidth = `${this.imageWidthOrigin + this.offset}px`;

    if (this.pull === 'right') {
      this.image.style.marginRight = `${this.offset * -1}px`
    }

    else if (this.pull === 'left') {
      this.image.style.marginLeft = `${this.offset * -1}px`
    }
  }
}
