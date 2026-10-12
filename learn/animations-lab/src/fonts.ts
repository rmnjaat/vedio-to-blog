// Lab-only font loading: self-hosted variable woff2 (Literata, Recursive with CASL/CRSV/MONO/slnt axes),
// so renders are deterministic and offline. The site loads the same families from Google Fonts itself;
// clip components only reference the family names.
import {continueRender, delayRender, staticFile} from 'remotion';

const handle = delayRender('Loading notebook fonts');
const faces = [
  new FontFace('Recursive', `url(${staticFile('fonts/Recursive-latin-var.woff2')}) format('woff2')`, {
    weight: '300 1000',
    style: 'oblique 0deg 15deg',
  }),
  new FontFace('Literata', `url(${staticFile('fonts/Literata-latin-var.woff2')}) format('woff2')`, {weight: '400 700'}),
];
Promise.all(faces.map((f) => f.load()))
  .then((loaded) => {
    loaded.forEach((f) => (document.fonts as unknown as Set<FontFace>).add(f));
    continueRender(handle);
  })
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });
