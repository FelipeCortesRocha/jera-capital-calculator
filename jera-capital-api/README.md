# Jera Capital API

This is a [Nodejs](https://nodejs.org/en)/[Express](https://expressjs.com/pt-br/) project that provides endpoint for creating, consulting and deleting simulations.

## Libraries used

- [Drizzle ORM](https://orm.drizzle.team/)
- [SQLite](https://sqlite.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Jest](https://jestjs.io/)
- [Nodemon](https://nodemon.io/)

## Getting Started

First install the project dependencies:
```bash
npm i
```

This app uses SQLite as database, so first thing you need to create it locally.
If you want you can set an environment variable to specify where do you want the db file to be created by creating a .env file in the root directory an setting `DB_FILE_NAME`, otherwise it will create a `local.db` file at the root.

After that all you need to do is to run the migrations with the following command
```bash
npm run drizzle:migrate
```

Then, run the development server:

```bash
npm run dev
```

Then your server will be running at [http://localhost:4000](http://localhost:4000).
