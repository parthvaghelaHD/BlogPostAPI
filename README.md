# Paperless

```bash 
Paperless is used to fetch the detail from the documents using google's cloud vision API and stores that data in the database. It is written in NodeJs and uses sequelizer as ORM and Postgres as database.  
```

### Prerequisites
   ```bash 
node [v8.10.0](https://nodejs.org/en/)
```
   ```bash 
postgres [12.1](https://www.postgresql.org/download/)
```


## Installation
You can download this repo or clone this using the below command

```bash
$ git clone https://bitbucket.org/kishan-bacancy/paperless.git
```

Install all dependencies and modules:
```bash
$ cd paperless
$ npm i
$ run at : 127.0.0.1:3000
```

## Setup
Once you clone or download project go into you folder
> create a .env file
 >now copy ***.env.local*** file to ***.env***
 >npm install (it will install all the dependencies required for the project)
 
#### .env file

```bash 
DB_HOST=localhost
DB_USER=root
DB_PASS=mysecret
DB_NAME=dbname
DB_DIALECT=postgres
DB_PORT=3306
APP_HOST=localhost
APP_PORT=3000
SECRET=adasxovnklnqklnkjdsankdnw
```

### Tech

paperless using mostly this technologies.

* [ Express.js ] - Awesome web-based text editor
* [ EJS ] - Markdown parser done right. Fast and easy to extend.
* [Bootstrap] - Great UI for modern web apps
* [Node.js] - Evented I/O for the backend
* [Sequelize] - A promise based NodeJs ORM for Postgres
* [Postgres] - Relational open source database 


License
----

MIT

