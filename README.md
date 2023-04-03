# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Instructions

Kindly run `yarn run dev` to start up the application.

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

---

### `yarn dev`

Runs the `yarn json-server` script and runs `yarn start` concorrectly.
it hosts the json data to an api and starts the application.

Open [http://localhost:3003/quizData](http://localhost:3003/quizData) to listen to requests.

The page will reload when you make changes.\
You may also see any lint errors in the console.

---

## Technologies

---

- [react-query]: version ^3.39.3
- [react-share]: version ^4.4.1.
- [styled-component]: version ^5.3.9.
- [uuid]: version ^9.0.0.
- [concurrently]: version ^8.0.1.

---

## `Description`

The project is a multi-choice quizz game that is built with reactJs and react flux - `contexts` and `useReducer` that have the following features:

- Difficulty [`easy`, `medium`, `hard`]
- Track the user progress
- Question time out for each question
- Very interactive
- Tracks the users score
- Provide feedback indication whether an answered question is correct or not
- Options to skip questions or come back to it
- Options to Share the score to social media
- sound effects to make the game engaging
- responsive across all platforms
