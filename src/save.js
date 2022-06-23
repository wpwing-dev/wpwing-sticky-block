import { __ } from "@wordpress/i18n";

import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { topSpace, checkForAdmin, zIndex } =
		attributes;

	return (
		<div {...useBlockProps.save()}>
			<div
				id="wpwing-sticky"
				data-top-space={topSpace}
				data-check-for-admin={checkForAdmin}
				data-z-index={zIndex}
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
