import React from 'react';
import BuiltUsing from './components/BuiltUsing';

const technologies = [
  { text: 'WebPack', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/webpack.svg' },
  { text: 'React', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/react.svg' },
  {
    text: 'React Router',
    imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/react-router.svg',
  },
  { text: 'Babel', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/babel.svg' },
  { text: 'PostCSS', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/postcss.svg' },
  { text: 'ESLint', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/eslint.svg' },
  { text: 'Jest', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/jest.svg' },
  {
    text: 'Ant Design',
    imgUrl: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
  },
];

export default () => <BuiltUsing technologies={technologies} />;
