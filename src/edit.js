import { useState } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks,
} from "@wordpress/block-editor";
import {
	BaseControl,
	BoxControl,
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
	RangeControl,
	SelectControl,
	ColorPalette,
} from "@wordpress/components";

import "./editor.scss";

const SHADOWS = {
	sm: '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.08)',
	md: '0 4px 6px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.08)',
	lg: '0 10px 15px rgba(0,0,0,.12), 0 4px 6px rgba(0,0,0,.08)',
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		topSpace,
		checkForAdmin,
		zIndex,
		scrollDirection,
		stopBefore,
		disableOnMobile,
		mobileBreakpoint,
		ariaLabel,
		stickyBackground,
		stickyShadow,
		stickyScale,
		stickyPaddingTop,
		stickyTextColor,
		fullWidthWhenSticky,
		stickyTransition,
		stickyTransitionDuration,
		stickyTransitionEasing,
		stickyPaddingBottom,
		stickyPaddingLeft,
		stickyPaddingRight,
		stickyBorderStyle,
		stickyBorderWidth,
		stickyBorderColor,
		stickyExtraClass,
		hideBeforeSticky,
		stickyPosition,
		bottomSpace,
		disableOnDesktop,
		desktopBreakpoint,
	} = attributes;

	const [ previewSticky, setPreviewSticky ] = useState( false );

	const previewStyle = previewSticky ? {
		backgroundColor: stickyBackground || undefined,
		color: stickyTextColor || undefined,
		boxShadow: SHADOWS[ stickyShadow ] || undefined,
		paddingTop: stickyPaddingTop ? `${ stickyPaddingTop }px` : undefined,
		paddingBottom: stickyPaddingBottom ? `${ stickyPaddingBottom }px` : undefined,
		paddingLeft: stickyPaddingLeft ? `${ stickyPaddingLeft }px` : undefined,
		paddingRight: stickyPaddingRight ? `${ stickyPaddingRight }px` : undefined,
		borderStyle: stickyBorderStyle !== 'none' ? stickyBorderStyle : undefined,
		borderWidth: stickyBorderStyle !== 'none' ? `${ stickyBorderWidth }px` : undefined,
		borderColor: stickyBorderStyle !== 'none' && stickyBorderColor ? stickyBorderColor : undefined,
		transform: stickyScale !== 100 ? `scale(${ stickyScale / 100 })` : undefined,
	} : {};

	const blockProps = useBlockProps( { style: previewStyle } );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<Panel>
					<PanelBody title={ __( "Sticky Options", "wpwing-sticky-block" ) }>
						<PanelRow>
							<SelectControl
								label={ __( "Sticky position", "wpwing-sticky-block" ) }
								value={ stickyPosition }
								options={ [
									{ label: __( "Top", "wpwing-sticky-block" ), value: "top" },
									{ label: __( "Bottom", "wpwing-sticky-block" ), value: "bottom" },
								] }
								onChange={ ( value ) => setAttributes( { stickyPosition: value } ) }
								help={ __(
									"Stick the block to the top or bottom of the viewport.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
						{ stickyPosition === 'top' && (
							<PanelRow>
								<RangeControl
									label={ __( "Space from top (px)", "wpwing-sticky-block" ) }
									value={ topSpace }
									min={ 0 }
									max={ 300 }
									onChange={ ( value ) =>
										setAttributes( { topSpace: value ?? 0 } )
									}
									help={ __(
										"Gap between the top of the viewport and the sticky block.",
										"wpwing-sticky-block"
									) }
								/>
							</PanelRow>
						) }
						{ stickyPosition === 'bottom' && (
							<PanelRow>
								<RangeControl
									label={ __( "Space from bottom (px)", "wpwing-sticky-block" ) }
									value={ bottomSpace }
									min={ 0 }
									max={ 300 }
									onChange={ ( value ) =>
										setAttributes( { bottomSpace: value ?? 0 } )
									}
									help={ __(
										"Gap between the bottom of the viewport and the sticky block.",
										"wpwing-sticky-block"
									) }
								/>
							</PanelRow>
						) }
						{ stickyPosition === 'top' && (
							<PanelRow>
								<ToggleControl
									label={ __(
										"Account for admin toolbar",
										"wpwing-sticky-block"
									) }
									help={ __(
										"Shifts the block down by the admin bar height for logged-in users.",
										"wpwing-sticky-block"
									) }
									checked={ checkForAdmin }
									onChange={ () =>
										setAttributes( { checkForAdmin: ! checkForAdmin } )
									}
								/>
							</PanelRow>
						) }
						<PanelRow>
							<RangeControl
								label={ __( "Z-index", "wpwing-sticky-block" ) }
								value={ zIndex }
								min={ -100 }
								max={ 1000 }
								onChange={ ( value ) => setAttributes( { zIndex: value } ) }
								help={ __(
									"Stack order when the block is sticky.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody
						title={ __( "Behavior", "wpwing-sticky-block" ) }
						initialOpen={ false }
					>
						<PanelRow>
							<ToggleControl
								label={ __( "Show only after scrolling", "wpwing-sticky-block" ) }
								checked={ hideBeforeSticky }
								onChange={ () =>
									setAttributes( { hideBeforeSticky: ! hideBeforeSticky } )
								}
								help={ __(
									"Hides the block until the scroll trigger is passed — useful for back-to-top buttons and floating CTAs.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label={ __( "Stick when", "wpwing-sticky-block" ) }
								value={ scrollDirection }
								options={ [
									{
										label: __( "Always", "wpwing-sticky-block" ),
										value: "always",
									},
									{
										label: __(
											"Only while scrolling up",
											"wpwing-sticky-block"
										),
										value: "up-only",
									},
								] }
								onChange={ ( value ) =>
									setAttributes( { scrollDirection: value } )
								}
								help={ __(
									'"Only while scrolling up" hides the block when scrolling down and reveals it on scroll up — a common pattern for sticky headers.',
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={ __( "Stop before element (CSS selector)", "wpwing-sticky-block" ) }
								value={ stopBefore }
								placeholder="#footer"
								onChange={ ( value ) =>
									setAttributes( { stopBefore: value } )
								}
								help={ __(
									"Un-sticks the block when it reaches this element. E.g. #footer",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody
						title={ __( "Responsive", "wpwing-sticky-block" ) }
						initialOpen={ false }
					>
						<PanelRow>
							<ToggleControl
								label={ __( "Disable sticky on mobile", "wpwing-sticky-block" ) }
								checked={ disableOnMobile }
								onChange={ () =>
									setAttributes( { disableOnMobile: ! disableOnMobile } )
								}
							/>
						</PanelRow>
						{ disableOnMobile && (
							<PanelRow>
								<RangeControl
									label={ __(
										"Mobile breakpoint (px)",
										"wpwing-sticky-block"
									) }
									value={ mobileBreakpoint }
									min={ 320 }
									max={ 1200 }
									onChange={ ( value ) =>
										setAttributes( { mobileBreakpoint: value } )
									}
									help={ __(
										"Sticky is disabled when the viewport is narrower than this value.",
										"wpwing-sticky-block"
									) }
								/>
							</PanelRow>
						) }
						<PanelRow>
							<ToggleControl
								label={ __( "Disable sticky on desktop", "wpwing-sticky-block" ) }
								checked={ disableOnDesktop }
								onChange={ () =>
									setAttributes( { disableOnDesktop: ! disableOnDesktop } )
								}
							/>
						</PanelRow>
						{ disableOnDesktop && (
							<PanelRow>
								<RangeControl
									label={ __(
										"Desktop breakpoint (px)",
										"wpwing-sticky-block"
									) }
									value={ desktopBreakpoint }
									min={ 600 }
									max={ 1920 }
									onChange={ ( value ) =>
										setAttributes( { desktopBreakpoint: value } )
									}
									help={ __(
										"Sticky is disabled when the viewport is wider than this value.",
										"wpwing-sticky-block"
									) }
								/>
							</PanelRow>
						) }
					</PanelBody>

					<PanelBody
						title={ __( "Sticky State Styles", "wpwing-sticky-block" ) }
						initialOpen={ true }
					>
						<PanelRow>
							<ToggleControl
								label={ __( "Preview sticky styles in editor", "wpwing-sticky-block" ) }
								help={ __(
									"Apply sticky-state colours, shadow, and padding to the block canvas so you can see how it will look when stuck.",
									"wpwing-sticky-block"
								) }
								checked={ previewSticky }
								onChange={ () => setPreviewSticky( ! previewSticky ) }
							/>
						</PanelRow>

						<hr style={ { margin: '8px 0 16px', borderColor: 'rgba(0,0,0,.1)', borderStyle: 'solid' } } />

						<BaseControl
							label={ __( "Background color when sticky", "wpwing-sticky-block" ) }
						>
							<ColorPalette
								value={ stickyBackground }
								onChange={ ( value ) =>
									setAttributes( { stickyBackground: value ?? "" } )
								}
							/>
						</BaseControl>

						<BaseControl
							label={ __( "Text color when sticky", "wpwing-sticky-block" ) }
						>
							<ColorPalette
								value={ stickyTextColor }
								onChange={ ( value ) =>
									setAttributes( { stickyTextColor: value ?? "" } )
								}
							/>
						</BaseControl>

						<PanelRow>
							<SelectControl
								label={ __( "Shadow when sticky", "wpwing-sticky-block" ) }
								value={ stickyShadow }
								options={ [
									{
										label: __( "None", "wpwing-sticky-block" ),
										value: "none",
									},
									{
										label: __( "Small", "wpwing-sticky-block" ),
										value: "sm",
									},
									{
										label: __( "Medium", "wpwing-sticky-block" ),
										value: "md",
									},
									{
										label: __( "Large", "wpwing-sticky-block" ),
										value: "lg",
									},
								] }
								onChange={ ( value ) =>
									setAttributes( { stickyShadow: value } )
								}
								help={ __(
									"Adds a drop shadow beneath the block once it becomes sticky.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>

						<hr style={ { margin: '8px 0 16px', borderColor: 'rgba(0,0,0,.1)', borderStyle: 'solid' } } />

						<BoxControl
							label={ __( "Padding when sticky (px)", "wpwing-sticky-block" ) }
							values={ {
								top: `${ stickyPaddingTop }px`,
								right: `${ stickyPaddingRight }px`,
								bottom: `${ stickyPaddingBottom }px`,
								left: `${ stickyPaddingLeft }px`,
							} }
							units={ [ { value: 'px', label: 'px', default: 0 } ] }
							onChange={ ( next ) =>
								setAttributes( {
									stickyPaddingTop: parseInt( next.top ?? '0', 10 ) || 0,
									stickyPaddingBottom: parseInt( next.bottom ?? '0', 10 ) || 0,
									stickyPaddingLeft: parseInt( next.left ?? '0', 10 ) || 0,
									stickyPaddingRight: parseInt( next.right ?? '0', 10 ) || 0,
								} )
							}
							help={ __(
								"Padding applied to all sides only while the block is sticky.",
								"wpwing-sticky-block"
							) }
						/>

						<hr style={ { margin: '16px 0', borderColor: 'rgba(0,0,0,.1)', borderStyle: 'solid' } } />

						<PanelRow>
							<SelectControl
								label={ __( "Border when sticky", "wpwing-sticky-block" ) }
								value={ stickyBorderStyle }
								options={ [
									{ label: __( "None", "wpwing-sticky-block" ), value: "none" },
									{ label: __( "Solid", "wpwing-sticky-block" ), value: "solid" },
									{ label: __( "Dashed", "wpwing-sticky-block" ), value: "dashed" },
								] }
								onChange={ ( value ) =>
									setAttributes( { stickyBorderStyle: value } )
								}
								help={ __(
									"Adds a border only while the block is sticky.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
						{ stickyBorderStyle !== "none" && (
							<>
								<PanelRow>
									<RangeControl
										label={ __( "Border width (px)", "wpwing-sticky-block" ) }
										value={ stickyBorderWidth }
										min={ 1 }
										max={ 10 }
										onChange={ ( value ) =>
											setAttributes( { stickyBorderWidth: value } )
										}
									/>
								</PanelRow>
								<BaseControl
									label={ __( "Border color when sticky", "wpwing-sticky-block" ) }
								>
									<ColorPalette
										value={ stickyBorderColor }
										onChange={ ( value ) =>
											setAttributes( { stickyBorderColor: value ?? "" } )
										}
									/>
								</BaseControl>
							</>
						) }

						<hr style={ { margin: '16px 0', borderColor: 'rgba(0,0,0,.1)', borderStyle: 'solid' } } />

						<PanelRow>
							<ToggleControl
								label={ __( "Full width when sticky", "wpwing-sticky-block" ) }
								checked={ fullWidthWhenSticky }
								onChange={ () =>
									setAttributes( { fullWidthWhenSticky: ! fullWidthWhenSticky } )
								}
								help={ __(
									"Expands the block to span the full viewport width when sticky.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
						<PanelRow>
							<RangeControl
								label={ __( "Scale when sticky (%)", "wpwing-sticky-block" ) }
								value={ stickyScale }
								min={ 50 }
								max={ 100 }
								onChange={ ( value ) =>
									setAttributes( { stickyScale: value ?? 100 } )
								}
								help={ __(
									"Shrinks the block to this percentage of its size when sticky. Useful for logos or nav bars that scale down on scroll.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label={ __( "Entry & exit transition", "wpwing-sticky-block" ) }
								value={ stickyTransition }
								options={ [
									{
										label: __( "None", "wpwing-sticky-block" ),
										value: "none",
									},
									{
										label: __( "Fade", "wpwing-sticky-block" ),
										value: "fade",
									},
									{
										label: __( "Slide", "wpwing-sticky-block" ),
										value: "slide",
									},
									{
										label: __( "Fade + Slide", "wpwing-sticky-block" ),
										value: "fade-slide",
									},
								] }
								onChange={ ( value ) =>
									setAttributes( { stickyTransition: value } )
								}
								help={ __(
									"Animation played when the block enters and exits the sticky state.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
						{ stickyTransition !== "none" && (
							<>
								<PanelRow>
									<RangeControl
										label={ __(
											"Transition duration (ms)",
											"wpwing-sticky-block"
										) }
										value={ stickyTransitionDuration }
										min={ 50 }
										max={ 600 }
										onChange={ ( value ) =>
											setAttributes( { stickyTransitionDuration: value } )
										}
										help={ __(
											"How long the entry animation takes in milliseconds.",
											"wpwing-sticky-block"
										) }
									/>
								</PanelRow>
								<PanelRow>
									<SelectControl
										label={ __( "Transition easing", "wpwing-sticky-block" ) }
										value={ stickyTransitionEasing }
										options={ [
											{ label: __( "Ease (default)", "wpwing-sticky-block" ), value: "ease" },
											{ label: __( "Ease in", "wpwing-sticky-block" ), value: "ease-in" },
											{ label: __( "Ease out", "wpwing-sticky-block" ), value: "ease-out" },
											{ label: __( "Ease in-out", "wpwing-sticky-block" ), value: "ease-in-out" },
											{ label: __( "Linear", "wpwing-sticky-block" ), value: "linear" },
										] }
										onChange={ ( value ) =>
											setAttributes( { stickyTransitionEasing: value } )
										}
										help={ __(
											"Controls the acceleration curve of the animation.",
											"wpwing-sticky-block"
										) }
									/>
								</PanelRow>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( "Accessibility", "wpwing-sticky-block" ) }
						initialOpen={ false }
					>
						<PanelRow>
							<TextControl
								label={ __( "ARIA label", "wpwing-sticky-block" ) }
								value={ ariaLabel }
								placeholder={ __( "e.g. Site navigation", "wpwing-sticky-block" ) }
								onChange={ ( value ) =>
									setAttributes( { ariaLabel: value } )
								}
								help={ __(
									'Adds an aria-label attribute to the sticky wrapper, improving screen reader context. Leave blank to omit.',
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody
						title={ __( "Advanced", "wpwing-sticky-block" ) }
						initialOpen={ false }
					>
						<PanelRow>
							<TextControl
								label={ __( "CSS class when sticky", "wpwing-sticky-block" ) }
								value={ stickyExtraClass }
								placeholder="my-sticky-class"
								onChange={ ( value ) =>
									setAttributes( { stickyExtraClass: value } )
								}
								help={ __(
									"Extra CSS classes added to the block when it is sticky. Separate multiple classes with spaces.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<InnerBlocks />
		</div>
	);
}
