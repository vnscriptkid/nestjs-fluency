up:
	docker compose up -d

up_build:
	docker compose up --build -d

down:
	docker compose down --remove-orphans --volumes

svc-comment:
	cd ./apps/comment-svc && npm run start:dev -- comment-svc

svc-moderation:
	cd ./apps/moderation-svc && npm run start:dev -- moderation-svc

svc-notification:
	cd ./apps/notification-svc && npm run start:dev -- notification-svc