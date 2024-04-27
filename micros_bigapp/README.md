## shared lib (dtos)
- nest g lib workflows

## validations
- npm i class-validator class-transformer


## health check
- npm i @nestjs/terminus
- nest g module health
- nest g controller health

## nats
- npm i @nestjs/microservices
- npm i nats

## comm models
- req/resp: call and wait
- pub/sub: fire and forget (move on)

## q/a
- how to setup healthcheck for different services: nats, db, etc
- how nestjs/nats implements req/resp between services behind the scenes
- how to run docker logs against multiple containers of the same image