# Skill Based Role Portal

Internal Role Portal is a centralised platform that is dynamic and designed to streamline and enhance the management of internal job roles and career progression within All-In-One

## Team Members

- Ng Kang Ting
- Keith Law
- Shannevie Teo
- Isabelle Sim
- Caitlin Yap
- Vanessa Lee

## Requirements

- Docker v4.24.2

## Project Setup

The application has been dockerised to include MySQL, phpMyAdmin, Kong API Gateway, Frontend application and the Microservices to provide seamless set up with Docker Compose. Please ensure that your MAMP/WAMP or any MySQL database is turned **OFF**. Additionally, please ensure that port 3306 is unused.

To run the project in development environment, access the parent folder directory and run docker compose.

```sh
cd skill-based-role-portal
docker-compose up
```

The application will take a few minutes to get everything set up. If the application is not working as expected, stop the terminal and run docker compose again.

```sh
docker-compose up
```

## MySQL + phpMyAdmin

To view and access the database, go to [http://127.0.0.1:5013](http://127.0.0.1:5013) and enter the following credentials.

- Server Name: mysql-database
- Username: root
- Password: root

## Frontend Application

To view the frontend application, go to [http://127.0.0.1:5173](http://127.0.0.1:5173).

## Microservices

The following are the addresses for the microservices. The respective API endpoints can be found in the Postman Collection.

- Staff: [http://127.0.0.1:5001/staff](http://127.0.0.1:5001/staff)
- Application: [http://127.0.0.1:5002/application](http://127.0.0.1:5002/role)
- Role: [http://127.0.0.1:5003/role](http://127.0.0.1:5003/role)
- Skill: [http://127.0.0.1:5004/skill](http://127.0.0.1:5004/skill)

## Postman Collection

To test the API endpoints of the microservices, import the following to Postman.

- [Skill-Based-Role-Portal Collection](/skill-based-role-portal.postman_collection.json)

<hr>

## Credentials to Login

**Username:** jack.sim@allinone.com.sg
**Password:** password

## Troubleshooting

### Docker-compose build fails

1. Delete all containers, images and volumes on Docker or Purge/Delete data on Docker
2. Enter the following into your terminal:

```sh
docker-compose build
docker-compose up
```
