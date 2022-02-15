# Booking

[![pipeline status](https://gitlab.com/alexey.bogushevich/booking/badges/develop/pipeline.svg)](https://gitlab.com/alexey.bogushevich/booking/-/commits/develop)


##### Table of Contents

1. [Documentation](#documentation)
   1. [Swagger documentation](#swagger-docs)
   2. [Frontend documentation](#frontend-docs)
   3. [Backend documentation](#backend-docs)
   4. [Deployment](#deployment)
   5. [Tests](#tests)
   6. [Contributing](#contributing)
3. [Setting up development environment](#setting-up-development-environment)
   1. [Environment variables](#environment-variables)
   2. [Installing docker & docker-compose](#installing-docker-and-docker-compose)
   3. [Setting up Booking](#setting-up-booking)
      1. [How to check code with PyLinter and Black](#how-to-check-code-with-pylinter-and-black)
4. [Third party integrations](#third-party-integrations)

## Documentation

#### Tech Stack: `to be determined`

### FrontEnd

### BackEnd

### Swagger docs

Open [Swagger documentation](https://localhost:3000/swagger/)

## Setting up development environment

### Environment variables

|            Name             |                  Description                   |                       Ex. value                       |
|:---------------------------:|:----------------------------------------------:|:-----------------------------------------------------:|
|           `DEBUG`           | `Status of the application (production false)` |                        `true`                         |
|     `DJANGO_SECRET_KEY`     |        `Secret key of the application`         |              `12asd%12bihn256!@@451safb`              |
|    `DJANGO_SILK_ENABLED`    |            `Enable debug with Silk`            |                        `true`                         |
|   `DJANGO_SENTRY_ENABLED`   |          `Enable logging with sentry`          |                        `true`                         |
|     `DJANGO_SENTRY_DSN`     |                `Sentry DSN URL`                |       `https://dsn.sentry.io/key-12aabceefasd`        |
|   `DJANGO_DATABASE_HOST`    |                `Database host`                 |                      `POSTGRES`                       |
|   `DJANGO_DATABASE_PORT`    |                `Database port`                 |                        `5234`                         |
|   `DJANGO_DATABASE_NAME`    |                `Database name`                 |                      `booking`                        |
|   `DJANGO_DATABASE_USER`    |                `Database user`                 |                      `booking`                        | 
| `DJANGO_DATABASE_PASSWORD`  |              `Database password`               |                      `booking`                        |
|      `EMAIL_HOST_USER`      |          `Email address (gmail.com)`           |                  `example@gmail.com`                  |
|    `EMAIL_HOST_PASSWORD`    |                `Email password`                |                   `examplepassword`                   |
|       `CELERY_BROKER`       |             `Celery message broker`            |                 `redis://redis:6379/0`                |
|       `CELERY_BACKEND`      |             `Celery message backend`           |                 `redis://redis:6379/0`                |
|  `SOCIAL_AUTH_GOOGLE_OAUTH2_KEY`   |           `Client ID on Google app`            |          `34jt5lerjekjq3h4rklk`          |
| `SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET` |           `Secret key on Google app`           |          `FLJGLKAJG4tw43trjio`           |
|     `SOCIAL_AUTH_FACEBOOK_KEY`     |          `Client ID on Facebook app`           |            `2345432456343245`            |
|   `SOCIAL_AUTH_FACEBOOK_SECRET`    |          `Secret key on Facebook app`          |       `fgdjrlkw4jlrkfnl423423qj3r`       |
|       `REDIRECT_URL`        |   `Registration confirmation redirect url`     |                   `https://yoho.by/`                  |
|            `RESET_URL`             | `Url for the correct redirect from the letter in the mail` |    `https ://yoho.by/password-reset`    |

-----------------------------------------------------------------------------------------------------------------------------------------

### Installing Docker and Docker Compose

Refer to original [Docker documentation](https://docs.docker.com/engine/installation/) for installing Docker.

After installing Docker you need to install [Docker Compose](https://docs.docker.com/compose/install/) to run
multi-container Docker applications (such as ours). The `curl` method is preferred for installation.

To run Docker commands without `sudo`, you also need to
[create a Docker group and add your user to it](https://docs.docker.com/engine/installation/linux/ubuntulinux/#/create-a-docker-group)
.

### Setting up Booking

#### How to check code with PyLinter and black?

**Flake8** linter and **Black** code formatter for python are implemented in this project.

To use them run these commands:

> **docker-compose** run --rm booking_django black **.** --check
>
>   **docker-compose** run --rm booking_django flake8 **.**
If you want to check only one directory or file, use the directory name or file name instead of a dot.


## Third party integrations 
