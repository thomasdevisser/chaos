/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
	RichText,
} from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

const ALLOWED_MEDIA_TYPES = ["image"];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { blockTitle, backgroundImageURL, backgroundImageID } = attributes;
	const blockStyles = {};
	if (backgroundImageURL)
		blockStyles.backgroundImage = `url(${backgroundImageURL})`;

	return (
		<section {...useBlockProps()} style={blockStyles}>
			{props.isSelected && (
				<MediaUploadCheck>
					<MediaUpload
						value={backgroundImageID}
						title={__("Choose a background image", "chaos")}
						onSelect={(media) =>
							setAttributes({
								backgroundImageURL: media.url,
								backgroundImageID: media.url,
							})
						}
						allowedTypes={ALLOWED_MEDIA_TYPES}
						render={({ open }) => (
							<Button
								variant="primary"
								onClick={open}
								className="background-image-btn"
							>
								{backgroundImageURL
									? "Change Background Image"
									: "Upload Background Image"}
							</Button>
						)}
					/>
				</MediaUploadCheck>
			)}
			<RichText
				tagName="h2"
				value={blockTitle}
				onChange={(blockTitle) => setAttributes({ blockTitle })}
				allowedFormats={["core/bold", "core/italic"]}
				placeholder={__("Your title...", "chaos")}
			/>
		</section>
	);
}
