# Welcome to the Memory Game Repo!

### What does it do?
At the time of this writing, the game has two modes: pokemon and playing cards. This is your typical memory game app. It gets some data, makes cards, and shows them flipped over. You have to match the cards to their pair. Once you match them all, you win!

### How to run
It's pretty simple. Just clone down this repo... Do a little `npm install && npm run start:dev` And you'll be up and running locally. As long as you have node on your machine, you should be good!

### How to test
This repo has some light testing using Jest. Do a simple `npm run test` and it'll run all tests within the `./spec` directory

### Notes to engineers
Let's say we want to support new types of cards in the future. It's a pretty simple process and all you need to do is three things:
1. add a service for the card. It should extend `./services/CardServiceBase.ts`. You have some abstract methods/props to define (mostly how to make the cards);
2. update the `./src/components/SelectGame.tsx` to have the new card service in the dropdown
3. update the `./services/GameServiceFactory.ts` to handle the new cardService selection