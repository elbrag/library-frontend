export const checkIfStatusIsOk = (statusCode: number) => {
	return statusCode >= 200 && statusCode < 300;
};
