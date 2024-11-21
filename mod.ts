type Listener = (offset: number) => void

interface ImageOffsetterParams {
  containerAnchor: HTMLDivElement
  imageAnchor: HTMLDivElement
  image: HTMLImageElement
  pull: 'left' | 'right'
  on?: {
    offsetChange: Listener
  }
}

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

  containerAnchor: HTMLDivElement
  imageAnchor: HTMLDivElement
  image: HTMLImageElement

  imageWidthOrigin: number = 0
  containerWidth: number = 0
  offset: number = 0
  pull: 'right' | 'left'
  listeners: Listener[] = []

  constructor({
    containerAnchor,
    imageAnchor,
    image,
    pull = 'right',
    on
  }: ImageOffsetterParams) {
    this.containerAnchor = containerAnchor
    this.imageAnchor = imageAnchor
    this.image = image
    this.pull = pull

    if (on) {
      if (on.offsetChange) {
        this.listeners.push(on.offsetChange)
      }
    }

    this.handleResize()
    globalThis.addEventListener('resize', () => this.handleResize())
  }

  handleResize() {
    this.imageWidthOrigin = this.imageAnchor.clientWidth
    this.containerWidth = this.containerAnchor.clientWidth
    this.offset = (min(this.MAX_WINDOW_WIDTH, globalThis.innerWidth) - this.containerWidth) / 2

    for (let index = 0; index < this.listeners.length; index++) {
      const fn = this.listeners[index];
      fn(this.offset)
    }

    this.image.style.minWidth = `${this.imageWidthOrigin + this.offset}px`;

    if (this.pull === 'right') {
      this.image.style.marginRight = `${this.offset * -1}px`
    }

    else if (this.pull === 'left') {
      this.image.style.marginLeft = `${this.offset * -1}px`
    }
  }
}

/* Helpers */
function min(a: number, b: number) {
  return a < b ? a : b
}
