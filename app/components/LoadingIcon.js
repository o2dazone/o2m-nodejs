/** @jsx h */
import css from 'styles/loadingIcon.scss';

import { h } from 'preact';

const LoadingIcon = () => (
  <div className={css.container}>
    <div className={css.rect1} />
    <div className={css.rect2} />
    <div className={css.rect3} />
    <div className={css.rect4} />
    <div className={css.rect5} />
  </div>
);

export default LoadingIcon;


