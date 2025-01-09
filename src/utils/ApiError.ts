class ApiError extends Error {
	apiMessage: string;
	statusCode: number;
	errors: any[];
	stack: string | undefined;
	constructor(
		apiMessage: string = "Something went wrong",
		statusCode: number = 500,
		errors: [],
		stack: string = ""
	) {
		super(apiMessage);
		this.statusCode = statusCode;
		this.apiMessage = apiMessage;
		this.errors = errors;
		this.statusCode = statusCode;

		if (stack) this.stack = stack;
		else Error.captureStackTrace(this, this.constructor);
	}
}

export default ApiError;
