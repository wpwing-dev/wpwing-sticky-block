import { registerBlockType, createBlock } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

const deprecated = [
	// v2 (Phase 1): data-* on block root, no new Phase 2 attributes.
	{
		save( { attributes } ) {
			const { topSpace, checkForAdmin, zIndex } = attributes;
			return (
				<div
					{ ...useBlockProps.save( {
						'data-top-space': topSpace,
						'data-check-for-admin': checkForAdmin,
						'data-z-index': zIndex,
					} ) }
				>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
	// v1 (original): inner <div id="wpwing-sticky"> wrapper.
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

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/group' ],
			transform: ( attributes, innerBlocks ) =>
				createBlock( 'wpwing/sticky-block', {}, innerBlocks ),
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/group' ],
			transform: ( attributes, innerBlocks ) =>
				createBlock( 'core/group', {}, innerBlocks ),
		},
	],
};

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated,
	transforms,
} );
