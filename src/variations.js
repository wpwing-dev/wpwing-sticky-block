import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

const variations = [
	{
		name: 'sticky-nav-bar',
		title: __( 'Sticky Nav Bar', 'wpwing-sticky-block' ),
		description: __(
			'A site title and navigation menu that sticks to the top of the viewport.',
			'wpwing-sticky-block'
		),
		attributes: {
			fullWidthWhenSticky: true,
			stickyBackground: '#ffffff',
			stickyShadow: 'small',
			zIndex: 100,
		},
		innerBlocks: [
			[
				'core/group',
				{
					layout: {
						type: 'flex',
						justifyContent: 'space-between',
						flexWrap: 'nowrap',
					},
				},
				[
					[ 'core/site-title' ],
					[
						'core/navigation',
						{ layout: { type: 'flex', justifyContent: 'right' } },
						[ [ 'core/page-list' ] ],
					],
				],
			],
		],
	},
	{
		name: 'cookie-notice-bar',
		title: __( 'Cookie Notice Bar', 'wpwing-sticky-block' ),
		description: __(
			'A dismissible bar anchored to the bottom of the viewport, with an accept button.',
			'wpwing-sticky-block'
		),
		attributes: {
			stickyPosition: 'bottom',
			fullWidthWhenSticky: true,
			dismissible: true,
			dismissExpiry: 30,
			stickyBackground: '#1e1e1e',
			stickyTextColor: '#ffffff',
		},
		innerBlocks: [
			[
				'core/group',
				{
					layout: {
						type: 'flex',
						justifyContent: 'space-between',
						flexWrap: 'wrap',
					},
				},
				[
					[
						'core/paragraph',
						{
							content: __(
								'We use cookies to improve your experience on this site. By continuing to browse, you agree to our use of cookies.',
								'wpwing-sticky-block'
							),
						},
					],
					[
						'core/buttons',
						{},
						[
							[
								'core/button',
								{ text: __( 'Accept', 'wpwing-sticky-block' ) },
							],
						],
					],
				],
			],
		],
	},
	{
		name: 'floating-cta',
		title: __( 'Floating CTA', 'wpwing-sticky-block' ),
		description: __(
			'A corner-anchored call-to-action button that reveals after the visitor scrolls.',
			'wpwing-sticky-block'
		),
		attributes: {
			stickyPosition: 'bottom',
			revealMode: 'scroll',
			scrollTriggerType: 'percent',
			scrollTriggerPercent: 30,
			dismissible: true,
			dismissExpiry: 7,
			stickyBorderRadius: 8,
			stickyShadow: 'medium',
			stickyExtraClass: 'wpwing-pattern-floating-cta',
		},
		innerBlocks: [
			[
				'core/buttons',
				{},
				[
					[
						'core/button',
						{ text: __( 'Get Started', 'wpwing-sticky-block' ) },
					],
				],
			],
		],
	},
	{
		name: 'back-to-top',
		title: __( 'Back to Top', 'wpwing-sticky-block' ),
		description: __(
			'A pill-shaped button that appears after scrolling and returns the visitor to the top of the page.',
			'wpwing-sticky-block'
		),
		attributes: {
			stickyPosition: 'bottom',
			revealMode: 'scroll',
			scrollTriggerType: 'percent',
			scrollTriggerPercent: 20,
			hideBeforeSticky: true,
			stickyBorderRadius: 999,
			stickyShadow: 'small',
			stickyExtraClass: 'wpwing-pattern-back-to-top',
		},
		innerBlocks: [
			[
				'core/buttons',
				{ layout: { type: 'flex', justifyContent: 'center' } },
				[
					[
						'core/button',
						{
							text: __( '↑ Back to top', 'wpwing-sticky-block' ),
							url: '#',
						},
					],
				],
			],
		],
	},
];

variations.forEach( ( variation ) =>
	registerBlockVariation( 'wpwing/sticky-block', {
		scope: [ 'inserter' ],
		...variation,
	} )
);
