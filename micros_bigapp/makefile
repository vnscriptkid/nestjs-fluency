app1:
	cd apps/micros_bigapp && npm run start:dev -- micros_bigapp

app2:
	cd apps/svc1 && npm run start:dev -- svc1

all:
	make app1 & make app2

up:
	docker-compose up -d

up_build:
	docker compose up -d --build

down:
	docker-compose down --remove-orphans --volumes

log1:
	docker compose logs -f micros_bigapp

log2:
	docker compose logs -f svc1

	