.DEFAULT_GOAL := help

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
.PHONY: help

assets: ## Build the block assets
	npm run build
.PHONY: assets

dev: ## Start local WordPress development environment
	docker compose up -d --wait db wordpress
	docker compose run --rm wpcli
	docker compose up -d caddy
	@echo ""
	@echo "Site:  https://sticky-block.local"
	@echo "Admin: https://sticky-block.local/wp-admin  (admin / password)"
	@echo ""
	@echo "First time? Run: make caddy-trust"
.PHONY: dev

caddy-trust: ## Trust Caddy's local CA (run once per machine, requires sudo)
	@echo "Waiting for Caddy to generate its CA..."
	@sleep 3
	docker compose cp caddy:/data/caddy/pki/authorities/local/root.crt /tmp/caddy-root.crt
	sudo cp /tmp/caddy-root.crt /usr/local/share/ca-certificates/caddy-local.crt
	sudo update-ca-certificates
	@echo "Done. Restart your browser."
.PHONY: caddy-trust

dev-stop: ## Stop the local WordPress environment
	docker compose down
.PHONY: dev-stop

env-reset: ## Remove containers, volumes, and the local database
	docker compose down -v
.PHONY: env-reset
