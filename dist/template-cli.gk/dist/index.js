import { input, select } from "@inquirer/prompts";

//#region src/index.ts
(async () => {
	const template = await select({
		message: "Select template to import",
		choices: [{
			name: "module-package",
			value: "modulePacakge"
		}]
	});
	console.log(template);
	if (await select({
		message: "Copy in current directory ?",
		choices: [{
			name: "Yes",
			value: true
		}, {
			name: "No",
			value: false
		}]
	})) process.exit(0);
	await input({ message: "Enter project name" });
})();

//#endregion
export {  };