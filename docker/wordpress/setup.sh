#!/bin/sh
set -e

WP_PATH=/var/www/html

echo "Waiting for wp-config.php..."
until [ -f "$WP_PATH/wp-config.php" ]; do
	sleep 2
done

if wp --path="$WP_PATH" core is-installed --allow-root 2>/dev/null; then
	echo "Already installed, skipping setup."
else
	echo "Installing WordPress..."
	wp --path="$WP_PATH" core install \
		--url="https://sticky-block.local" \
		--title="Sticky Block Dev" \
		--admin_user=admin \
		--admin_password=password \
		--admin_email=dev@example.com \
		--skip-email \
		--allow-root

fi

echo "Activating plugin..."
wp --path="$WP_PATH" plugin activate wpwing-sticky-block --allow-root
echo "Done. Visit https://sticky-block.local/wp-admin (admin / password)"
