type Listener = (offset: number) => void

interface ImageOffsetterParams {
  containerAnchor: HTMLDivElement
  imageAnchor: HTMLDivElement
  image: HTMLImageElement
  pull?: 'left' | 'right'
  on?: {
    offsetChange: Listener
  }
  maxWindowWidth?: number
}

export class ImageOffsetter {
  maxWindowWidth = 1728 //px

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
    maxWindowWidth,
    on,
  }: ImageOffsetterParams) {
    this.containerAnchor = containerAnchor
    this.imageAnchor = imageAnchor
    this.image = image
    this.pull = pull
    if (maxWindowWidth) this.maxWindowWidth = maxWindowWidth

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
    this.offset = (min(this.maxWindowWidth, globalThis.innerWidth) - this.containerWidth) / 2

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
