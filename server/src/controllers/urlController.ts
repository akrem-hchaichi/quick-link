import { NextFunction, Request, Response } from 'express';
import UrlService from '../services/urlService';

class UrlController {
    // Create a new URL
    static async createUrl(req: Request, res: Response) {
        const { longUrl, customShortId } = req.body;
        try {
            const url = await UrlService.createUrl(longUrl, customShortId);
            res.status(201).json(url);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get all URLs
    static async getAllUrls(req: Request, res: Response) {
        try {
            const {
                page = 1,
                limit = 10,
                sortBy = 'createdAt',
                sortOrder = 'desc',
                ...filters
            } = req.query;


            const sort: { [key: string]: 1 | -1 } = {
                [sortBy.toString()]: sortOrder === 'asc' ? 1 : -1
            };

            const result = await UrlService.getAllUrls(
                Number(page),
                Number(limit),
                filters as { [key: string]: any },
                sort
            );

            res.json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a URL by shortId
    static async getUrlByShortId(req: Request, res: Response, next: NextFunction) {
        const { shortId } = req.params;
        try {
            const url = await UrlService.getUrlByShortId(shortId);
            res.status(200).json(url);
        } catch (error) {
            next(error);
        }
    }


    // Update a URL
    static async updateUrl(req: Request, res: Response, next: NextFunction) {
        const { shortId } = req.params;
        const { longUrl, customShortId } = req.body;

        try {
            const url = await UrlService.updateUrl(shortId, { longUrl, customShortId });
            res.status(200).json(url);
        } catch (error) {
            next(error);
        }
    }


    // Delete a URL
    static async deleteUrl(req: Request, res: Response) {
        const { shortId } = req.params;
        try {
            const url = await UrlService.deleteUrl(shortId);
            res.json({ message: 'URL deleted successfully', url });
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}

export default UrlController;