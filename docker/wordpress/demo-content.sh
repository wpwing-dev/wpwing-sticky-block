#!/bin/sh
set -eu

WP_PATH=/var/www/html

if [ "${1:-}" = "reset" ]; then
	for slug in sticky-demo-article sticky-demo-sidebar sticky-demo-reveal sticky-demo-multiple; do
		existing_id=$(wp --path="$WP_PATH" post list \
			--post_type=page \
			--name="$slug" \
			--format=ids \
			--allow-root | awk '{print $1}')
		if [ -n "$existing_id" ]; then
			wp --path="$WP_PATH" post delete "$existing_id" --force --allow-root >/dev/null
			echo "Removed demo page: $slug"
		fi
	done
fi

ensure_page() {
	slug=$1
	title=$2
	content=$3
	existing_id=$(wp --path="$WP_PATH" post list \
		--post_type=page \
		--name="$slug" \
		--format=ids \
		--allow-root | awk '{print $1}')

	if [ -n "$existing_id" ]; then
		echo "Demo page exists: $slug"
		return
	fi

	wp --path="$WP_PATH" post create \
		--post_type=page \
		--post_status=publish \
		--post_name="$slug" \
		--post_title="$title" \
		--post_content="$content" \
		--allow-root >/dev/null
	echo "Created demo page: $slug"
}

article_content=$(cat <<'EOF'
<!-- wp:wpwing/sticky-block {"stickyPosition":"top","revealMode":"scroll","scrollTriggerType":"percent","scrollTriggerPercent":20,"stickyBackground":"#17324d","stickyTextColor":"#ffffff","stickyPaddingTop":12,"stickyPaddingBottom":12,"stickyPaddingLeft":20,"stickyPaddingRight":20,"stickyShadow":"md","dismissible":true} -->
<p><strong>Reading progress bar</strong> - Scroll past 20 percent to reveal this top sticky block.</p>
<!-- /wp:wpwing/sticky-block -->

<!-- wp:heading {"level":1} -->
<h1>Long Article Demo</h1>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>This page provides realistic vertical space for testing sticky behavior. It includes headings, paragraphs, lists, and repeated sections so the sticky block can be observed during a long scroll.</p>
<!-- /wp:paragraph -->
EOF
)

for section in 1 2 3 4 5 6 7 8 9 10; do
	article_content="$article_content
<!-- wp:heading {\"level\":2} -->
<h2>Article section $section</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Sticky interfaces need to behave well while content changes around them. This section gives the page enough height to test offsets, transitions, resize handling, and the moment when a block enters or leaves the viewport.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul><li>Scroll up and down across the trigger point.</li><li>Resize the browser while the block is sticky.</li><li>Compare the top offset with the visible content.</li></ul>
<!-- /wp:list -->"
done

sidebar_content=$(cat <<'EOF'
<!-- wp:heading {"level":1} -->
<h1>Sticky Sidebar Demo</h1>
<!-- /wp:heading -->
<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"68%"} -->
<div class="wp-block-column" style="flex-basis:68%"><!-- wp:heading {"level":2} --><h2>Article column</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>This column is deliberately long so the neighboring sticky block has a parent container taller than itself.</p><!-- /wp:paragraph -->
<!-- wp:paragraph --><p>Use this page to test the Within parent container mode. The block should stick inside the columns area and scroll away when the parent ends.</p><!-- /wp:paragraph -->
<!-- wp:paragraph --><p>More content keeps the layout tall enough to inspect the complete lifecycle. Repeat the scroll several times and resize the window between passes.</p><!-- /wp:paragraph -->
<!-- wp:paragraph --><p>Additional content helps expose overflow and positioning issues in themes and nested layout blocks.</p><!-- /wp:paragraph --></div>
<!-- /wp:column -->
<!-- wp:column {"width":"32%"} -->
<div class="wp-block-column" style="flex-basis:32%"><!-- wp:wpwing/sticky-block {"stickyMode":"container","stickyBackground":"#f0b429","stickyPaddingTop":16,"stickyPaddingBottom":16,"stickyPaddingLeft":16,"stickyPaddingRight":16,"stickyShadow":"md"} --><p><strong>Sidebar block</strong></p><p>Confined to the parent.</p><!-- /wp:wpwing/sticky-block --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->
EOF
)

reveal_content=$(cat <<'EOF'
<!-- wp:heading {"level":1} -->
<h1>Reveal Trigger Demo</h1>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Use the editor to switch this block between immediate, scroll, percentage, and delayed reveal modes.</p>
<!-- /wp:paragraph -->
<!-- wp:wpwing/sticky-block {"stickyPosition":"bottom","revealMode":"delay","revealDelay":3,"stickyBackground":"#23645a","stickyTextColor":"#ffffff","stickyPaddingTop":12,"stickyPaddingBottom":12,"stickyPaddingLeft":20,"stickyPaddingRight":20,"stickyShadow":"lg"} -->
<p><strong>Delayed bottom CTA</strong> - this appears three seconds after page load.</p>
<!-- /wp:wpwing/sticky-block -->
<!-- wp:spacer {"height":"900px"} -->
<div style="height:900px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
<!-- wp:paragraph -->
<p>After the delay, continue scrolling to verify that the normal bottom sticky position and spacing still work.</p>
<!-- /wp:paragraph -->
EOF
)

multiple_content=$(cat <<'EOF'
<!-- wp:heading {"level":1} -->
<h1>Multiple Sticky Blocks Demo</h1>
<!-- /wp:heading -->
<!-- wp:wpwing/sticky-block {"stickyPosition":"top","revealMode":"scroll","scrollTriggerOffset":300,"stickyBackground":"#17324d","stickyTextColor":"#ffffff","stickyPaddingTop":10,"stickyPaddingBottom":10,"stickyPaddingLeft":16,"stickyPaddingRight":16} -->
<p><strong>Top block</strong> - reveals after 300 pixels.</p>
<!-- /wp:wpwing/sticky-block -->
<!-- wp:paragraph -->
<p>Scroll through this page to test multiple independent blocks. Each block should maintain its own trigger, position, styles, and sticky events.</p>
<!-- /wp:paragraph -->
<!-- wp:spacer {"height":"700px"} -->
<div style="height:700px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
<!-- wp:wpwing/sticky-block {"stickyPosition":"bottom","stickyBackground":"#8f3b3b","stickyTextColor":"#ffffff","stickyPaddingTop":10,"stickyPaddingBottom":10,"stickyPaddingLeft":16,"stickyPaddingRight":16,"dismissible":true} -->
<p><strong>Bottom block</strong> - dismiss me and reload the page.</p>
<!-- /wp:wpwing/sticky-block -->
<!-- wp:paragraph -->
<p>Keep scrolling and resize the browser. This page is intended for checking interactions between more than one sticky block on the same document.</p>
<!-- /wp:paragraph -->
<!-- wp:spacer {"height":"1100px"} -->
<div style="height:1100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
EOF
)

ensure_page "sticky-demo-article" "Sticky Demo - Long Article" "$article_content"
ensure_page "sticky-demo-sidebar" "Sticky Demo - Sidebar" "$sidebar_content"
ensure_page "sticky-demo-reveal" "Sticky Demo - Reveal Triggers" "$reveal_content"
ensure_page "sticky-demo-multiple" "Sticky Demo - Multiple Blocks" "$multiple_content"
