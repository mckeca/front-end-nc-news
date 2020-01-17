# Cal's Northcoders News Front End App

## Introduction

Welcome to my Northcoders front end project! I've created a React app which will retrieve data from my back end project and present in to the user in a slick and intuitive fashion. Thus far, my site possesses the following functionality:

- A log in page (a drop down of existing users, no authentication implemented)
- A paginated list of all articles, or articles filtered by topic
- The ability to sort articles by date, votes, or comments
- The ability to click an a user's username to view their information and all articles written by them
- The ability to view a specific article along with the comments attached
- The ability to add a comment to any specific article
- The ability to vote on any article or comment not written by your own user (to avoid shameless self-promotion)
- The ability to delete any comments or articles written by your own user
- The ability to write and add an article to any of the existing topics.

You can find it hosted online at https://cals-nc-news.herokuapp.com/api

You can find the back end hosted online at https://cals-nc-news-app.herokuapp.com/api

Or you can find my back end git repo at https://github.com/mckeca/nc_news

## Getting Started

The first thing you'll need to do in order to run my project is clone it from github. You can do this by entering the following into your terminal:

```
git clone https://github.com/mckeca/front-end-nc-news.git
```

### Prerequisites

To run this project you will need Node v12.13.1. You can check you versions by running:

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

### Setting the Environment

You're nearly ready to go! Just a couple more things to set up -

You'll need to create a file in the root directory called "knexfile.js". If you are using Linux, this will need to include your username and password for PSQL, so make sure it's included in the .gitignore! Mac users don't have to worry about it. This file will allow knex to make a connection to the database and needs to be pretty specific, so copy and paste the following:

```javascript
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news',
      // Linux users only:
      username: 'your username',
      password: 'your password'
    }
  },
  test: {
    connection: {
      database: 'nc_news_test',
      // Linux users only:
      username: 'your username',
      password: 'your password'
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

### Seeding

The last thing you have to do is seed the database - this can be done by running the command:

```
"npm run seed"
```

in your terminal. This will seed both the development database and the test database, so both will be ready for use!

## Testing

Now that you've got everything set up, you might want to double check that the code actually works. There are two different test commands available, running

```
npm run test-utils
```

will test the functions responsible for manipulating data as it is seeded into the database.
Alternatively, running

```
npm test
```

will test the server itself, making various requests to all the available endpoints. If this command takes a little time to run, don't worry. The test database is re-seeded before every test so it will take a few seconds to run through the entire suite.

If all goes well, running either of these commands should result in a lot of green ticks scrolling past your terminal!

## Acknowledgments

- Caffeine
- Bon Jovi
