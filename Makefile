.DEFAULT_GOAL := help

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
.PHONY: help

assets: ## Build the block assets
	npm run build
.PHONY: assets

version-bump: ## Update plugin metadata and rebuild assets (VERSION=x.y.z)
	@if [ -z "$(VERSION)" ]; then echo "Usage: make version-bump VERSION=x.y.z"; exit 1; fi
	node scripts/version-bump.js "$(VERSION)"
	npm run build
.PHONY: version-bump

dev: ## Start local WordPress development environment
	docker network inspect wpwing-proxy >/dev/null 2>&1 || docker network create wpwing-proxy
	docker compose up -d --wait db wordpress
	docker compose run --rm wpcli
	docker compose up -d caddy
	@echo ""
	@echo "Site:  https://sticky-block.local"
	@echo "Admin: https://sticky-block.local/wp-admin  (admin / password)"
	@echo ""
	@echo "First time? Run: make caddy-trust"
.PHONY: dev

demo-content: ## Create missing sticky behavior demo pages
	docker compose run --rm wpcli sh /docker/wordpress/demo-content.sh
.PHONY: demo-content

demo-reset: ## Delete and recreate sticky behavior demo pages
	docker compose run --rm wpcli sh /docker/wordpress/demo-content.sh reset
	docker compose run --rm wpcli sh /docker/wordpress/demo-content.sh
.PHONY: demo-reset

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
