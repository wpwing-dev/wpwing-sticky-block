import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks,
} from "@wordpress/block-editor";
import {
	ToggleControl,
	Panel,
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
} from "@wordpress/components";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { topSpace, checkForAdmin, minWidth, maxWidth, pushUp, zIndex } =
		attributes;

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<Panel>
					<PanelBody title={__("Sticky Options")}>
						<PanelRow>
							<TextControl
								label={__("Space between sticky block and top of screen:")}
								value={topSpace}
								type="number"
								onChange={(value) =>
									setAttributes({ topSpace: Number.parseInt(value, 10) })
								}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__(
									"Move the block down a little bit if there is a toolbar at the top (for logged in users)"
								)}
								checked={checkForAdmin}
								onChange={(value) =>
									setAttributes({
										checkForAdmin: !checkForAdmin,
									})
								}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={__(
									"Block should not be sticky on screens smaller than:"
								)}
								value={minWidth}
								type="number"
								onChange={(value) =>
									setAttributes({ minWidth: Number.parseInt(value, 10) })
								}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={__("Block should not be sticky on screens wider than:")}
								value={maxWidth}
								type="number"
								onChange={(value) =>
									setAttributes({ maxWidth: Number.parseInt(value, 10) })
								}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={__("Pushup Element:")}
								value={pushUp}
								type="text"
								onChange={(value) => setAttributes({ pushUp: value })}
								help="e.g. '#footer', '.widget-bottom', etc."
							/>
						</PanelRow>
						<PanelRow>
							<RangeControl
								label={__("Z-index:")}
								value={zIndex}
								min={-100}
								max={1000}
								onChange={(value) => setAttributes({ zIndex: value })}
								help="Only applies once the element is sticky"
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<InnerBlocks />
		</div>
	);
}
