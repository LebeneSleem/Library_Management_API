const express = require('express');
const { getBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const rateLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.get('/', rateLimiter, getBooks);
router.get('/:id', rateLimiter, getBookById);
router.post('/', rateLimiter, addBook);
router.put('/:id', rateLimiter, updateBook);
router.delete('/:id', rateLimiter, deleteBook);

module.exports = router;
