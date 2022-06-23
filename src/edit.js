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
} from "@wordpress/components";

// import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { topSpace, checkForAdmin, zIndex } =
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
