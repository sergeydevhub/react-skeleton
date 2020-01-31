import React from 'react';
import Root from './root';
import ReactDOM from 'react-dom';
import FontFaceObserver from 'fontfaceobserver';
import { register, unregister } from "./service-worker";

const fontWeights = [300, 500, 700];
const asyncRobotoFont: Array<Promise<any>> = fontWeights.map(weight => {
  const font = new FontFaceObserver('Roboto', { weight });
  return font.load();
});

const materialIconsFont = new FontFaceObserver('Material Icons').load();

Promise.all([...asyncRobotoFont, materialIconsFont])
  .then(() => { document.body.classList.add('fontLoaded') })
  .catch(err => console.log(err));


const mountNode = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Root />,
  mountNode
);

process.env.NODE_ENV === 'production' ? register() : unregister();

if (module.hot) {
  module.hot.accept();
}
