# React Starter

An up to date starter project you can clone and start developing React apps.

## Includes:

- Universal rendering (optional)
- Routing with [React router v3](https://github.com/ReactTraining/react-router)
- [Webpack 2](https://webpack.js.org/)
- [Antd UI components](https://ant.design) (has many really useful components)
- [PostCSS](http://postcss.org/)
- [CSS Modules](https://css-tricks.com/css-modules-part-1-need/)
- [Hot module replacement](http://stackoverflow.com/questions/24581873/what-exactly-is-hot-module-replacement-in-webpack)
- Optimization & minification with source maps
- Express based production node server (with gzip compression)
- [Helmet](https://github.com/nfl/react-helmet) for handling meta tags
- Tests using [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/)

## To be added:

- [Redux](http://redux.js.org/) (and related)
- Image optimisation
- Font loading
- Environment config for app settings
- Anything else you suggest

## How to run

```sh
$ yarn install

# for local developement workflow
$ yarn start

# creates a production build
$ yarn build

# creates a production build with Server Side Rending (SSR)
$ yarn build:withSSR
```

## Naming Convensions
- Never use inline styles
- Always use a local scoped css file for each component
- Component filename should start with a capital case (for eg. `WelcomeMessage.jsx`)
- CSS file names always use kebab-case (for eg. `welcome-message.css`)

## Directory Structure
Instead of using file types to club similar files under a folder (for example: all React components would live under `components/`, and all Redux reducers would live under `reducers/`), use features (i.e. modules) to club files together.

Below is an example
```
├── components/             # re-usable components go there
│   ├── Card/
│   │   ├── Card.jsx
│   │   ├── index.js
│   │   ├── card.css
│   │   └── card.spec.jsx
│   └── CurrencyInput/
│       ├── CurrencyInput.jsx
│       ├── index.js
│       └── currency-input.spec.jsx
...
├── index.jsx
└── modules/
    ├── authentication/     # everything related to auth goes here
    |   ├── actions/        # actions related to auth
    |   ├── api/            # apis
    |   ├── components/     # and the components only used by auth module
    |   ├── helpers/        # also auth related helpers
    │   ├── AuthhenticationContainer.jsx    # container component
    │   └── index.js
    ├── comments/           # same goes for comment module
    |   ├── actions/        # actions related to comments
    |   ├── api/            # apis
    |   ├── components/     # and the components only used by comment module
    |   ├── helpers/        # also comment related helpers
    │   ├── CommentContainer.jsx            # container component
    │   ├── index.js
    └── index.js
```

## Known Issues
- Slower initial build :confused:
