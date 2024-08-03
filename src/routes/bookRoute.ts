const express = require('express');
const {createBook, updateBook, getAllBooks, getBookById, deleteBook} = require('../controllers/bookController');
const fileUpload = require('../middleware/uploadFile');
const utils = require('../utils')

const router = express.Router();

router.post('/book', utils.validateInput(['title', 'author', 'publishedDate', 'isbn']),createBook);
router.delete('/book/:id', deleteBook);
router.get('/book', getAllBooks);
router.get('/book/:id', getBookById);
router.patch('/book/update/:id', fileUpload.single('coverImage'), updateBook);

module.exports = router;