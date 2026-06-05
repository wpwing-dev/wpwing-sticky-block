import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks,
} from "@wordpress/block-editor";
import {
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
		stickyPaddingTop,
		stickyTextColor,
		fullWidthWhenSticky,
		stickyTransition,
		stickyTransitionDuration,
		stickyPaddingBottom,
		stickyPaddingLeft,
		stickyPaddingRight,
		stickyBorderStyle,
		stickyBorderWidth,
		stickyBorderColor,
		stickyExtraClass,
	} = attributes;

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<Panel>
					<PanelBody title={ __( "Sticky Options", "wpwing-sticky-block" ) }>
						<PanelRow>
							<TextControl
								label={ __(
									"Space from top of screen (px)",
									"wpwing-sticky-block"
								) }
								value={ topSpace }
								type="number"
								onChange={ ( value ) =>
									setAttributes( {
										topSpace: Number.parseInt( value, 10 ) || 0,
									} )
								}
							/>
						</PanelRow>
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

					<PanelBody
						title={ __( "Sticky State Styles", "wpwing-sticky-block" ) }
						initialOpen={ false }
					>
						<p style={ { marginBottom: "8px", fontWeight: 500 } }>
							{ __( "Background color when sticky", "wpwing-sticky-block" ) }
						</p>
						<ColorPalette
							value={ stickyBackground }
							onChange={ ( value ) =>
								setAttributes( { stickyBackground: value ?? "" } )
							}
						/>
						<p style={ { marginBottom: "8px", marginTop: "16px", fontWeight: 500 } }>
							{ __( "Text color when sticky", "wpwing-sticky-block" ) }
						</p>
						<ColorPalette
							value={ stickyTextColor }
							onChange={ ( value ) =>
								setAttributes( { stickyTextColor: value ?? "" } )
							}
						/>
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
						<PanelRow>
							<RangeControl
								label={ __(
									"Top padding when sticky (px)",
									"wpwing-sticky-block"
								) }
								value={ stickyPaddingTop }
								min={ 0 }
								max={ 100 }
								onChange={ ( value ) =>
									setAttributes( { stickyPaddingTop: value } )
								}
							/>
						</PanelRow>
						<PanelRow>
							<RangeControl
								label={ __(
									"Bottom padding when sticky (px)",
									"wpwing-sticky-block"
								) }
								value={ stickyPaddingBottom }
								min={ 0 }
								max={ 100 }
								onChange={ ( value ) =>
									setAttributes( { stickyPaddingBottom: value } )
								}
							/>
						</PanelRow>
						<PanelRow>
							<RangeControl
								label={ __(
									"Left padding when sticky (px)",
									"wpwing-sticky-block"
								) }
								value={ stickyPaddingLeft }
								min={ 0 }
								max={ 100 }
								onChange={ ( value ) =>
									setAttributes( { stickyPaddingLeft: value } )
								}
							/>
						</PanelRow>
						<PanelRow>
							<RangeControl
								label={ __(
									"Right padding when sticky (px)",
									"wpwing-sticky-block"
								) }
								value={ stickyPaddingRight }
								min={ 0 }
								max={ 100 }
								onChange={ ( value ) =>
									setAttributes( { stickyPaddingRight: value } )
								}
								help={ __(
									"Padding applied to all four sides only while the block is stuck.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
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
								<p style={ { marginBottom: "8px", marginTop: "8px", fontWeight: 500 } }>
									{ __( "Border color when sticky", "wpwing-sticky-block" ) }
								</p>
								<ColorPalette
									value={ stickyBorderColor }
									onChange={ ( value ) =>
										setAttributes( { stickyBorderColor: value ?? "" } )
									}
								/>
							</>
						) }
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
							<SelectControl
								label={ __( "Entry transition", "wpwing-sticky-block" ) }
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
										label: __( "Slide down", "wpwing-sticky-block" ),
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
									"Animation played when the block enters the sticky state.",
									"wpwing-sticky-block"
								) }
							/>
						</PanelRow>
						{ stickyTransition !== "none" && (
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
						) }
					</PanelBody>
				</Panel>
			</InspectorControls>

			<InnerBlocks />
		</div>
	);
}
