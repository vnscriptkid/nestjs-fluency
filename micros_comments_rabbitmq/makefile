up:
	docker compose up -d

up_build:
	docker compose up --build -d

down:
	docker compose down --remove-orphans --volumes

svc-comment:
	npm run start:dev -- comment-svc

svc-moderation:
	npm run start:dev -- moderation-svc

svc-notification:
	npm run start:dev -- notification-svc

log-comment:
	docker compose logs -f comment-svc

log-mod:
	docker compose logs -f moderation-svc

log-notif:
	docker compose logs -f notification-svc

# user: guest, password: guest
rabbit:
	open http://localhost:15672