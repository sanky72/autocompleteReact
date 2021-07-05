# AutoComplete component with create react app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run

In the project directory, you can run:

### `npm install`

This will install all required dependencies.

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Project description

## Custom Hooks.

Created a searching custom hook, which mangages the state of loading, the data values here used as user, and uses the debounce 'util'.

## Debounce used.

I've used a debounce util to limit the frequency of xhr calls.

## State management.

State mangagement is handled by React-hooks, primarily using useState, useEffect, useRef.

## Infinte scroll using Intersection observer.

To not load huge data sets in one go which will create a burden and make the app slow, I've used the principle of infinte scroll.
Intersection observer has been used to find when the last element of current iteration is shown to the user, at that moment we call the next page of Github API.

## Loading, error and empty states.

For all these states, I've currenty used a simple <div> with text in it. But we can easily switch that with components for better user experience.

## Thanks.
