# Cal's Northcoders News Front End App

## Introduction

Welcome to my Northcoders front end project! I've created a React app which will retrieve data from my back end project and present in to the user in a slick and intuitive fashion. Thus far, my site possesses the following functionality:

- A log in page (a drop down of existing users, no authentication implemented)
- A paginated list of all articles, or articles filtered by topic
- The ability to sort articles by date, votes, or comments
- The ability to click on a user's username to view their information and all articles written by them
- The ability to view any specific article along with a paginated list of comments attached
- The ability to add a comment to any specific article
- The ability to vote on any article or comment not written by your own user (to avoid shameless self-promotion)
- The ability to delete any comments or articles written by your own user
- The ability to write and add an article to any of the existing topics.

You can find it hosted online at https://cals-front-end-news.herokuapp.com/

You can find the back end hosted online at https://cals-nc-news-app.herokuapp.com/api

Or you can find my back end github repo at https://github.com/mckeca/nc_news

## Getting Started

The first thing you'll need to do in order to run my project is clone it from github. You can do this by entering the following into your terminal:

```
git clone https://github.com/mckeca/front-end-nc-news.git
```

### Prerequisites

To run this project you will need Node v12.13.1. You can check your version by running:

```
node -v
```

You will also need to install several packages:

- react
- reach router
- axios

To install these packages you can simply run:

```
npm install [package]
```

with the exception of reach router, which requires the command:

```
npm install @reach/router
```

alternatively, running:

```
npm install
```

will install everything in the package.json

### Creating a React App

Once everything has installed, you'll need to create you own instance of the React app. You can do this with the terminal command:

```
npx create-react-app [your-app-name-here]
```

This will likely take a minute or two, but once it's finished you'll want to to type:

```
cd [your-app-name-here]
```

You can now run the app locally with the command:

```
npm start
```

And that's it! You now have a running instance of my NC News app to play around with. Enjoy!

## Acknowledgments

- Caffeine
- Gerry Rafferty
