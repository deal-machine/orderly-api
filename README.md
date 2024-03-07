<div align="center">
  <h2>Orderly</h2>
</div>

> Orderly is a cutting-edge web system designed to streamline operations for restaurant and food businesses (RMS).
> It draws from the principles of Domain-Driven Design (DDD) and Architectures to ensure scalability, maintainability, and a robust integration capability.

<br>

> GitHub

<br>

## How to run the application

## Running on docker

```bash
# up with build
$ docker compose up --build

# up with detached mode 
$ docker compose up -d

# down the app
$ docker compose down
```

## Running on kubernetes

```bash
# create namespace orderly
$ kubectl apply -f k8s/namespaces.yaml

# set orderly namespace to default
$ kubectl config set-context --current --namespace=orderly

# message-broker
$ kubectl apply -f k8s/message-broker/

# database
$ kubectl apply -f k8s/db/

# api
$ kubectl apply -f k8s/api/

# api-gateway
$ kubectl apply -f k8s/api-gateway/

# proxy
$ kubectl apply -f k8s/proxy/

# to watch all pods running
$ watch -n1 kubectl get pods
```

<br>

### Domain Driven Design

## Context Map

<p align="center">
  <a target="blank"><img src="./docs/images/context-map.png" width="1200" alt="DDD Context Map" style="border-radius:10px;" /></a>
</p>

<br>

## Use cases


### - Check-in flow

<p align="center">
  <a target="blank"><img src="./docs/images/checkin-usecase.png" height="400" alt="Create order Usecase" style="border-radius:10px;" /></a>
</p>

### - Create order-payment flow

<p align="center">
  <a target="blank"><img src="./docs/images/create-order-usecase.png" width="1000" alt="Create order Usecase" style="border-radius:10px;" /></a>
</p>

### - approve/cancel payment and prepare/withdrawn orders

<p align="center">
  <a target="blank"><img src="./docs/images/approve-payment-usecase.png" width="1000" alt="Pay order Usecase" style="border-radius:10px;" /></a>
</p>

### - Complete flow

<p align="center">
  <a target="blank"><img src="./docs/images/all-flow.png" width="1000" alt="Prepare order Usecase" style="border-radius:10px;" /></a>
</p>


<br>

## Kubernetes Diagram - Infrastructure

<p align="center">
  <a target="blank"><img src="./docs/images/k8s-cloud.png" width="1000" alt="Kubernetes diagram" style="border-radius:10px;" /></a>
</p>

<br>

<br>

## Cloud Diagram - Infrastructure

<p align="center">
  <a target="blank"><img src="./docs/images/k8s-cloud.png" width="1000" alt="Kubernetes diagram" style="border-radius:10px;" /></a>
</p>

<p align="center">
  <a target="blank"><img src="./docs/images/cloud-gcp.png" width="1000" alt="Kubernetes diagram" style="border-radius:10px;" /></a>
</p>

<p align="center">
  <a target="blank"><img src="./docs/images/k8s-cloud-infra.png" width="1000" alt="Kubernetes diagram" style="border-radius:10px;" /></a>
</p>

<p align="center">
  <a target="blank"><img src="./docs/images/repositories.png" width="1000" alt="Kubernetes diagram" style="border-radius:10px;" /></a>
</p>

<br>


## Clean Architecture

<p align="center">
  <a target="blank"><img src="./docs/images/clean-arch.png" width="1200" alt="Legend" style="border-radius:10px;" /></a>
</p>

<br>

## Resources

#### - Message Broker

<p align="center">
  <a target="blank"><img src="./docs/images/broker.png" width="850" alt="Legend" style="border-radius:10px;" /></a>
</p>

#### - Events

<p align="center">
  <a target="blank"><img src="./docs/images/events.png" width="850" alt="Legend" style="border-radius:10px;" /></a>
</p>

#### - Entity Relationship Diagram - Database

<p align="center">
  <a target="blank"><img src="./docs/images/er-diagram.png" width="850" alt="Entity Relationship Diagram" style="border-radius:10px;" /></a>
</p>

