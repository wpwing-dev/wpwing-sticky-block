import { __ } from '@wordpress/i18n';

import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ __(
				'Wpwing Sticky Block – hello from the saved content!',
				'wpwing-sticky-block'
			) }
		</p>
	);
}
