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
searchPokemon
```

It will be expanded like this.

#### Out:

```js
export const searchPokemon = createAction("SEARCH_POKEMON");
```

#### Request/Success/Failure pattern

Type action name containing "Request" with camelcase and save it.

```js
getPokemonRequest
```

It will be expanded like this.

#### Out:

```js
export const getPokemonRequest = createAction("GET_POKEMON_REQUEST");
export const getPokemonSuccess = createAction("GET_POKEMON_SUCCESS");
export const getPokemonFailure = createAction("GET_POKEMON_FAILURE");
```


## Result

```js
import { createAction } from "redux-actions";

export const getPokemonRequest = createAction("GET_POKEMON_REQUEST");

```

# Test

This plugin has two test files. \
First is babel plugin main test file named `test.js` on root direcotry. \
Next is a `test/redux_actions_test.js` that will be transformed by the plugin. 

Run this command.

` npm run test`

Test will run and you can see what happen.

If you modify the target javascript source code, please change the `test/redux_actions_test.js`.
