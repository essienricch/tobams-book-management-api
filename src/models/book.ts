import mongoose from "mongoose";

interface IBook extends mongoose.Document{
  title: string;
  author: string;
  publishedDate: Date;
  isbn: string;
  coverImage?: string;
}

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  isbn: { type: String, required: true , unique: true },
  coverImage: { type: String },
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
