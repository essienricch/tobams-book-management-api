import { Response } from 'express';

const handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

module.exports = handleError