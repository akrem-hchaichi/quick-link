import express from 'express';
import UrlController from '../controllers/urlController';
import { body, query } from 'express-validator';
import validateRequest from '../middlewares/validateRequest';

const router = express.Router();

// Create a new URL
router.post(
    '/urls',
    [
        body('longUrl').isURL().withMessage('Invalid URL format'),
        body('customShortId')
            .optional()
            .isAlphanumeric()
            .withMessage('Custom short ID must be alphanumeric'),
    ],
    validateRequest,
    UrlController.createUrl
);

// Get all URLs
router.get(
    '/urls',
    [
        query('page').optional().isInt({ min: 1 }).toInt(),
        query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
        query('sortBy').optional().isIn(['shortId', 'longUrl', 'clicks', 'createdAt']),
        query('sortOrder').optional().isIn(['asc', 'desc']),
        query('shortId').optional().isString(),
        query('longUrl').optional().isString(),
        query('customShortId').optional().isString(),
        query('clicks').optional().isInt(),
        query('createdAt').optional().isISO8601()
    ],
    validateRequest,
    UrlController.getAllUrls
);

// Get a URL by shortId
router.get('/urls/:shortId', UrlController.getUrlByShortId);

// Update a URL
router.put(
    '/urls/:shortId',
    [
        body('longUrl').optional().isURL().withMessage('Invalid URL format'),
        body('customShortId')
            .optional()
            .isAlphanumeric()
            .withMessage('Custom short ID must be alphanumeric'),
    ],
    validateRequest,
    UrlController.updateUrl
);

// Delete a URL
router.delete('/urls/:shortId', UrlController.deleteUrl);

export default router;