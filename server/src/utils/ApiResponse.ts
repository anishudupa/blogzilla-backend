class ApiResponse {
	status: string;
	data: any;
	statusCode: number;
	message: string;

	constructor(
		status: string = "SUCCESS",
		data: any,
		statusCode: number,
		message: string
	) {
		this.status = status;
		this.data = data;
		this.statusCode = statusCode;
		this.message = message;
	}
}

export default ApiResponse;
