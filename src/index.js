import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

// v1 saved an inner <div id="wpwing-sticky"> wrapper; v2 puts data-* on the block root.
const deprecated = [
	{
		save( { attributes } ) {
			const { topSpace, checkForAdmin, zIndex } = attributes;
			return (
				<div { ...useBlockProps.save() }>
					<div
						id="wpwing-sticky"
						data-top-space={ topSpace }
						data-check-for-admin={ checkForAdmin }
						data-z-index={ zIndex }
					>
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated,
} );
