<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="70" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ npm install
```

## Running kubernetes

```bash
# create namespace orderly
$ kubectl create ns orderly

# set orderly namespace to default
$ kubectl config set-context --current --namespace=orderly

# cache
$ kubectl apply -f k8s/cache

# database
$ kubectl apply -f k8s/db

# api
$ kubectl apply -f k8s/api
```

## Running docker

```bash
# up with build
$ docker compose up --build

# up with detached mode 
$ docker compose up -d

# down the app
$ docker compose down
```
