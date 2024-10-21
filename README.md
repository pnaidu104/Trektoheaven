a basic application for taking queries related to trekking, frontend is hosted on http server, for backend services used nodejs and for database mysql. this is a guide on how to run this application on your local pc.
Pre-requisites-> install mysql server on your local pc to access the database,
              make a new schema called contactdb and create a contact table-
        -->   CREATE TABLE `contacts` (
              `id` INT NOT NULL AUTO_INCREMENT,
              `first_name` VARCHAR(255) NOT NULL,
              `last_name` VARCHAR(255) NOT NULL,
              `contact_number` VARCHAR(255) DEFAULT NULL,
              `email` VARCHAR(255) NOT NULL,
              `country` VARCHAR(255) NOT NULL,
              `subject` TEXT NOT NULL,
              PRIMARY KEY (`id`)
              );
             -> install node.js 

Fork this repository, and switch to branch application0000
----->to start the backend services,go to backend folder, and initialize this project
-> npm init -y
install required packages:
-> npm install express body-parser mysql cors
-> npm install mysql
in the command line put the below command, to start your server hosted at 5000 port
-> node server.js

----->to start the frontend, go to frontend folder
open yout terminal and run
-> npm install -g http-server
to start the server, write-
http-server -p 3000

Viola!
