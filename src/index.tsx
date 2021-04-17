import React from 'react';
import Root from './root';
import ReactDOM from 'react-dom';
import FontFaceObserver, { FontVariant } from 'fontfaceobserver';
import { register, unregister } from "./service-worker";
import 'reflect-metadata';

const fontWeights = [ 300, 500, 700 ];

const asyncRobotoFont: Array<Promise<void>> = fontWeights.map(weight => {
  const variant: FontVariant = { weight };
  const font = new FontFaceObserver('Roboto', variant);
  return font.load();
});

const materialIconsFont: Promise<void> = new FontFaceObserver('Material Icons').load();

Promise.all([...asyncRobotoFont, materialIconsFont])
  .then(() => document.body.classList.add('fontLoaded'))
  .catch(err => console.log(err));


const mountNode: HTMLElement | null = document.getElementById('root');

ReactDOM.render(
  <Root />,
  mountNode
);

process.env.NODE_ENV === 'production' ? register() : unregister();

if (module.hot) {
  module.hot.accept();
}
