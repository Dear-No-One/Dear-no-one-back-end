# Server
## Dear No One 

This project is live at (https://dearnooneq3.firebaseapp.com/).

Dear No One is a web app that was created to be a blogging platform. The design is to enable users with no tech know how to create and maintain a blog free of charge. The app offers a clean UI/UX expierence for bloggers to quickly create there very own blog. With multiple templete and color themes to choose from the blogger can design a more personal feel to thier page. 

As a none logged in user, one browse and view blogs based categories. But as a registeraed user, one and create thier own blog post from anywhere in the site. 

Dear No One is built on ember.js framework and uses ember-data, ember-paper, and ember-simple-oauth. The server is built in Node.js using Express, Knex.js, and Postgres. 


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

### Installing
NOTE: You will need to clone both this server repo and the client repo at (https://github.com/Dear-No-One/Dear-no-one-frontend)

* Fork and clone this repo
* `$ cd` into the folder and `$ npm install`
* Create a PSQL database named `dear-no-one`
* Run `$ knex migrate:latest` and `$ knex seed:run`
* See the `example.env` file for needed Environment variables
  * Don't forget to create your own `.env` file with your project's specific Environment variables
* Launch nodemon on the server with `$ nodemon` from the root of the sever repo
* Launch an http-server with `$ http-server` from the root of the client repo
* When this is all ready, visit http://localhost:4200 from your browser to launch the landing page

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
