export const formatDate = (date: string) => {
	const _date = new Date(date);
	return _date.toLocaleDateString("en-GB", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};
