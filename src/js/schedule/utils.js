let currId = 1;

export let counter = {
	generateId: () => {
		return currId++;
	},
};
