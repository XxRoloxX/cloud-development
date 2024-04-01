SHELL := /bin/bash

start:
	source .env && docker compose up -d
start-prod:
	source .env && docker compose -f docker-compose.prod.yml up -d
build-prod:
	source .env && docker compose -f docker-compose.prod.yml build
stop-prod:
	docker compose -f docker-compose.prod.yml down
deploy:
	git pull origin main
	make build-prod
	make stop-prod
	make start-prod

