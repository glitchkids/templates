import { input, select } from "@inquirer/prompts";
import degit from "degit";

//#region src/index.ts
function getCategoryChoices(recordTemplates) {
	return Object.keys(recordTemplates).map((category) => {
		return {
			name: category,
			value: category
		};
	});
}
function getTemplateChoices(recordTemplates, category) {
	return recordTemplates[category].map((template) => {
		return {
			name: template.name,
			value: template.url
		};
	});
}
(async () => {
	const templates = await fetch("https://raw.githubusercontent.com/glitchkids/templates/refs/heads/development/templates.json").then((res) => res.json()).then((r) => r);
	const currentCategory = await select({
		message: "Select category",
		choices: getCategoryChoices(templates)
	});
	const templateChoices = getTemplateChoices(templates, currentCategory);
	const currentTemplate = await select({
		message: `${currentCategory}  - Select template`,
		choices: templateChoices
	});
	if (await select({
		message: "Copy in current directory ?",
		choices: [{
			name: "Yes",
			value: true
		}, {
			name: "No",
			value: false
		}]
	})) {
		await degit(currentTemplate).clone("./");
		process.exit(0);
	}
	const folderName = await input({ message: "Enter project name" });
	await degit(currentTemplate).clone("./" + folderName);
	process.exit(0);
})();

//#endregion
export {  };