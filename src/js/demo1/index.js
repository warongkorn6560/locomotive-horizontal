import { preloadImages, preloadFonts } from '../utils'
import Cursor from '../cursor'
import LocomotiveScroll from 'locomotive-scroll'
import img1 from '/img/demo1/11.jpg'
import img2 from '/img/demo1/10.jpg'
import img3 from '/img/demo1/9.jpg'

// Initialize Locomotive Scroll (horizontal direction)
const lscroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  direction: 'horizontal',
})

lscroll.on('scroll', (args) => {
  if (typeof args.currentElements['hey'] === 'object') {
    let el = args.currentElements['hey']
    let progress = el.progress
    let rotateDeg = 360 * progress
    document.querySelectorAll(
      '[data-scroll-id="hey"]'
    )[0].style.transform = `rotate(${rotateDeg}deg)`
  }
  if (typeof args.currentElements['change-img'] === 'object') {
    let el = args.currentElements['change-img']
    let progress = el.progress
    let imgFrame = document.querySelectorAll('[data-scroll-id="change-img"]')[0]
    if (0.4 <= progress && progress < 0.6) {
      imgFrame.style.backgroundImage = `url(${img1})`
    }
    if (0.2 <= progress && progress < 0.4) {
      imgFrame.style.backgroundImage = `url(${img2})`
    }
    if (0 <= progress && progress < 0.2) {
      imgFrame.style.backgroundImage = `url(${img3})`
    }
  }
})

// Preload images and fonts
Promise.all([
  preloadImages('.gallery__item-imginner'),
  preloadFonts('vxy2fer'),
]).then(() => {
  // Remove loader (loading class)
  document.body.classList.remove('loading')

  // Initialize custom cursor
  const cursor = new Cursor(document.querySelector('.cursor'))

  // Mouse effects on all links and others
  ;[...document.querySelectorAll('a')].forEach((link) => {
    link.addEventListener('mouseenter', () => cursor.enter())
    link.addEventListener('mouseleave', () => cursor.leave())
  })
})
