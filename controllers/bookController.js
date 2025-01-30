const { Book } = require('../models');
const responseHandler = require('../utils/responseHandler');

// @desc Get all books with pagination
exports.getBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const { count, rows } = await Book.findAndCountAll({ limit, offset });

        responseHandler(res, 200, 'Books retrieved successfully', {
            books: rows,
            pagination: { total: count, currentPage: parseInt(page), totalPages: Math.ceil(count / limit) }
        });
    } catch (error) {
        responseHandler(res, 500, 'Server error', { error: error.message });
    }
};

// @desc Get book details
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return responseHandler(res, 404, 'Book not found');

        responseHandler(res, 200, 'Book details retrieved', { book });
    } catch (error) {
        responseHandler(res, 500, 'Server error', { error: error.message });
    }
};

// @desc Add a new book
exports.addBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        responseHandler(res, 201, 'Book added successfully', { book: newBook });
    } catch (error) {
        responseHandler(res, 400, 'Invalid data', { error: error.message });
    }
};

// @desc Update a book
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return responseHandler(res, 404, 'Book not found');

        await book.update(req.body);
        responseHandler(res, 200, 'Book updated successfully', { book });
    } catch (error) {
        responseHandler(res, 500, 'Server error', { error: error.message });
    }
};

// @desc Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return responseHandler(res, 404, 'Book not found');

        await book.destroy();
        responseHandler(res, 200, 'Book deleted successfully');
    } catch (error) {
        responseHandler(res, 500, 'Server error', { error: error.message });
    }
};
