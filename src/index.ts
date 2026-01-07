import MarkdownIt from "markdown-it";
import {Infographic, type InfographicOptions} from "@antv/infographic";

// Define interface to await readiness of import
export default function infographic(md: MarkdownIt, baseOptions?: Partial<Omit<InfographicOptions, 'container'>>) {
	function getLangName(info: string): string {
		return info.split(/\s+/g)[0];
	}

	// Store reference to original renderer.
	let defaultFenceRenderer = md.renderer.rules.fence;

	// Render custom code types as SVGs, letting the fence parser do all the heavy lifting.
	function customFenceRenderer(
		tokens: any[],
		idx: number,
		options: any,
		env: any,
		slf: any
	) {
		let token = tokens[idx];
		let info = token.info.trim();
		let langName = info ? getLangName(info) : "";

		if (["infographic", "{infographic}"].indexOf(langName) === -1) {
			if (defaultFenceRenderer !== undefined) {
				return defaultFenceRenderer(tokens, idx, options, env, slf);
			}
			// Missing fence renderer!
			return "";
		}

		const element = document.createElement('div')
		element.dataset.infographic = "true"
		document.body.appendChild(element)
		// Render with Mermaid
		try {
			const instance = new Infographic({
				container: element,
				...baseOptions
			})
			instance.render(token.content)
			const svg = element.children[0]
			// Infographic handles the visibility of svg internally through MutationObserver, we may output directly
			// to the nodejs here, so we process the style to make it display by default
			if (svg instanceof SVGElement) {
				svg.style.visibility = '';
			}
		} catch (e) {
			return `<div class="alert alert-danger">${e}</div>`;
		} finally {
			element.remove()
		}

		return element.outerHTML;
	}

	md.renderer.rules.fence = customFenceRenderer;
}
