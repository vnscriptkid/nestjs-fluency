up:
	docker compose up -d

down:
	docker compose down --remove-orphans --volumes

psql:
	docker exec -it nestjs psql -U postgres