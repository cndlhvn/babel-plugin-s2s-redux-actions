# babel-plugin-s2s-redux-actions

> generate redux actions

## Install

```
$ yarn add --dev babel-plugin-s2s-redux-actions
```

## Create redux-actions template

You should create babel-plugin-s2s-redux-actions template. \
In your node project, you create a folder named templates in the same direcotry as the package.json

`mkdir templates`

And create a redux-action.js

`touch templates/redux-action.js`

Write this code.

`import { createAction } from 'redux-actions'`

## s2s.config.js

s2s-redux-actions plugin watch the `src/actions/*.js` files

```js
module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /src\/actions\/.*.js/,
      plugin: ['s2s-redux-actions']
    },
  ],
  templates: [
    {
      test: /src\/actions\/.*.js/, input: 'redux-action.js'
    }
  ]
}
```
## Start s2s

Start the s2s with yarn command

`yarn run s2s`

## Usage

#### When create actions file

When you create a `src/actions/*.js`, the below code is inserted automatically.

```js
import { createAction } from 'redux-actions'
```

#### In:

Type action name with camelcase and save it.

```js
getPokemonRequest
```

It will be expanded like this.

#### Out:

```js
export const getPokemonRequest = createAction("GET_POKEMON_REQUEST");
```

## Result

```js
import { createAction } from "redux-actions";

export const getPokemonRequest = createAction("GET_POKEMON_REQUEST");


```
