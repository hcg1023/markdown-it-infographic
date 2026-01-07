import type MarkdownIt from "markdown-it";
import type { Options, Renderer, StateBlock, Token } from "markdown-it";



function renderPlugin(tokens: Token[], idx: number, options: Options, env: any, self: Renderer) {
	return self.renderToken(tokens, idx, options);
}

function plugin(state: StateBlock, startLine: number, endLine: number, silent: boolean) {
	return false;
}

export default function myPlugin(md: MarkdownIt) {
	md.block.ruler.after("list", "my_plugin", plugin);
	md.renderer.rules.plugin_open = renderPlugin;
};