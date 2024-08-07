import { Response } from "express";

class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const handleHttp = (res: Response, message: string, error?: unknown) => {
  let statusCode = 500;
  let responseMessage = message;

  if (error instanceof CustomError) {
    statusCode = error.status;
    responseMessage = error.message;
  } else if (error instanceof Error) {
    responseMessage = error.message;
  } else if (typeof error === "string") {
    responseMessage = error;
  }

  console.error(error);
  res.status(statusCode).send({ error: responseMessage });
};

export { handleHttp, CustomError };
