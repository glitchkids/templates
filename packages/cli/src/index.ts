import { select, input, Separator } from '@inquirer/prompts';
import degit from 'degit';
// import templates from '../../templates.json' assert { type: 'json' };

interface ITemplate {
	name: string;
	url: string;
}
type TRecordTemplates = Record<string, ITemplate[]>;

function getCategoryChoices(recordTemplates: TRecordTemplates) {
	return Object.keys(recordTemplates).map((category) => {
		return {
			name: category,
			value: category
		};
	});
}

function getTemplateChoices(recordTemplates: TRecordTemplates, category: string) {
	return recordTemplates[category].map((template) => {
		return {
			name: template.name,
			value: template.url
		};
	});
}

(async () => {
	const templates = await fetch(
		'https://raw.githubusercontent.com/glitchkids/templates/refs/heads/development/templates.json'
	)
		.then((res) => res.json())
		.then((r) => r as TRecordTemplates);

	const categoryChoices = getCategoryChoices(templates);
	const currentCategory = await select({
		message: 'Select category',
		choices: categoryChoices
	});

	const templateChoices = getTemplateChoices(templates, currentCategory);
	const currentTemplate = await select({
		message: `${currentCategory}  - Select template`,
		choices: templateChoices
	});

	const toCurrentDirectory = await select({
		message: 'Copy in current directory ?',
		choices: [
			{
				name: 'Yes',
				value: true
			},
			{
				name: 'No',
				value: false
			}
		]
	});

	if (toCurrentDirectory) {
		await degit(currentTemplate).clone('./');
		process.exit(0);
	}

	const folderName = await input({ message: 'Enter project name' });
	await degit(currentTemplate).clone('./' + folderName);
	process.exit(0);
})();
