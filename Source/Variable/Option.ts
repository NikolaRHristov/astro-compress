/**
 * @module Option
 *
 */
export default (
	await import("typescript-esbuild/Target/Function/Merge.js")
).default((await import("files-pipe/Target/Variable/Option.js")).default, {
	CSS: {
		csso: (await import("./CSS/csso.js")).default,
		lightningcss: (await import("./CSS/lightningcss.js")).default,
	},
	HTML: {
		"html-minifier-terser": (await import("./HTML/html-minifier-terser.js"))
			.default,
	},
	JavaScript: {
		terser: (await import("./JavaScript/terser.js")).default,
	},
	Image: {
		sharp: (await import("./Image/sharp.js")).default,
	},
	SVG: {
		svgo: (await import("./SVG/svgo.js")).default,
	},
	Map: (await import("./Map.js")).default,
	Parser: (await import("./Parser.js")).default,
	Action: {
		Failed: async ({ Input }) =>
			`${red("Error:")} Cannot compress file ${gray(
				await Directory(Input)
			)}${red((await import("path")).parse(Input).base)}`,
		Passed: async ({ Before, Buffer: _Buffer }) =>
			Before > Buffer.byteLength(_Buffer.toString()),
		Accomplished: async ({ Input, Before, After }) => {
			const Final = Before - After;

			return `${gray(
				`(-${await (
					await import("files-pipe/Target/Function/Bytes.js")
				).default(Final)})`
			)}	${(await import("kleur")).green(
				`${((Final / Before) * 100).toFixed(2)}%`
			)} reduction in ${gray(await Directory(Input))}${(
				await import("kleur")
			).cyan((await import("path")).parse(Input).base)}`;
		},
		Changed: async (Plan) =>
			Object.defineProperty(Plan.Info, "Total", {
				value:
					(Plan.Info.Total ? Plan.Info.Total : 0) +
					(Plan.On.Before - Plan.On.After),
				configurable: true,
				writable: true,
			}) && Plan,
	},
} satisfies Type);

import type Type from "../Interface/Option.js";

const { gray, red } = await import("kleur");

const { default: Directory } = await import("../Function/Directory.js");
