export const formatDateFromISO = (date: string) => {
	const _date = new Date(date);
	return _date.toLocaleDateString("en-GB", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

export const formatDateToISO = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toISOString();
};
