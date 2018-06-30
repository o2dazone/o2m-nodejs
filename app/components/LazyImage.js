import { Component, createRef } from 'react';

class LazyImage extends Component {
  static observer;
  static img;

  componentDidMount() {
    const image = this.img.ref.current;

    if (!('IntersectionObserver' in window)) {
      this.onImageLoad(image);
    } else {
      this.observer = new IntersectionObserver(this.onIntersect, {
        rootMargin: '0px',
        threshold: 0.01
      });

      this.observer.observe(image);
    }
  }

  onImageLoad = image => {
    const src = image.dataset.src;

    return src && new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    }).then(() => {
      image.src = src;
    });
  }

  onIntersect = entries => {
    const { intersectionRatio, target } = entries[0];

    if (intersectionRatio > 0) {
      this.onImageLoad(target);
      this.observer.unobserve(target);
      this.observer.disconnect();
    }
  }

  render() {
    // this is sloppy...
    const child = { ...this.props.children };
    const img = createRef();
    child.ref = img;
    this.img = child;
    return child;
  }
}

export default LazyImage;