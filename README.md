### Server Installation Setup

##### 1. Install NodeJS

Install node JS **12.18.\***, You can read the installation guide in [https://nodejs.org/en/download](https://nodejs.org/en/download/)

##### 2. create database

then create your first Database name "test_rolling_glory"

##### 3. Install Packages

Move to root project directory and run:

```bash
$ npm install
```

##### 4. Create .env File

Copy env.example to .env

```bash
$ cp env.example .env
```

Setup your database settings

```bash
NODE_ENV=development
TIME_ZONE=Asia/Jakarta

##### 5. Install Sequelize CLI

Install sequelize ORM CLI to create or run migration, seeder, etc

```bash
$ npm install --save-dev sequelize-cli
```

to see sequelize command you can type

```bash
$ npx sequelize --help
```

###### Running Migration

Run migration by typing:

```bash
$ npx sequelize-cli db:migrate
```


##### 5. Install PM2 Process Manager

```bash
$ npm install pm2@latest -g
# or
$ yarn global add pm2
```

to start pm2 process run

```bash
$ pm2 start src/index.js
# Or start for development
$ pm2 start src/index.js --watch
```

##### 6. Finish

endpoint: 


Base Route

# http://localhost:3000


schema DB yang di buat : 

# for run unit testing

1. open terminal
2. go to directry folder
3. typing `npm run test` in terminal

# parking Table

| Field Name         | Type     | Key | Description                         |
| ------------------ | -------- | :-: | ----------------------------------- |
| id                 | string   | PK  |                                     |
| plat_no            | string   |     |                                     |
| date_in            | datetime |     |                                     |
| date_out           | datetime |     |                                     |
| total_times        | integer  |     |                                     |
| total_price        | integer  |     |                                     |






