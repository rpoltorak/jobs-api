# Jobs API

## Requirements

-   Docker
-   docker-compose

## Setup

Go to the project's root directory and type:

```bash
$ docker-compose build
$ docker-compose up
```

Address

```bash
http://localhost:4000/graphql
```

## API usage examples

### Register mutation

```bash
mutation Register($email: String!, $password: String!, $passwordConfirmation: String!) {
  register(email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
    id
    email
  }
}
```

### Job query

```bash
query Job($id: Int!) {
  job(id: $id) {
    id
    title
  }
}

```
