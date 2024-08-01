const express = require('express');
const {createBook, updateBook, getAllBooks, getBookById, deleteBook} = require('../controllers/bookController');
const fileUpload = require('../middleware/uploadFile');

const router = express.Router();

router.post('/', createBook);
router.delete('/:id', deleteBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.patch('/update/:id', fileUpload.single('coverImage'), updateBook);

module.exports = router;