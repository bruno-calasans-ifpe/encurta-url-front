export class ApiError extends Error {
  constructor(
    public message: string,
    public code: number,
    public status: string
  ) {
    super(message);
  }
}
