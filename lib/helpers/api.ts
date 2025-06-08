export const checkIfStatusIsOk = (statusCode: number) => {
	return statusCode >= 200 && statusCode < 300;
};

export const apiRequest = async <T>(
	url: string,
	method: string,
	body?: T,
	fallbackErrorMessage: string = "An unknown error occurred"
): Promise<
	number | { error: string; errors?: Array<{ path: string; message: string }> }
> => {
	try {
		const response = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: body ? JSON.stringify(body) : undefined,
		});

		if (!response.ok) {
			const errorData = await response
				.json()
				.catch(() => ({ message: fallbackErrorMessage }));
			if (errorData.errors) {
				return { error: "Validation error", errors: errorData.errors };
			} else {
				return { error: errorData.message || fallbackErrorMessage };
			}
		}

		return response.status;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: error.message };
		}
		return { error: fallbackErrorMessage };
	}
};
