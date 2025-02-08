import { NextFunction } from 'express';
import Url from '../models/urlModel';
import shortid from 'shortid';

class UrlService {
    // Create a new URL
    static async createUrl(longUrl: string, customShortId?: string) {
        const shortId = customShortId || shortid.generate();

        if (customShortId) {
            const existingUrl = await Url.findOne({ customShortId });
            if (existingUrl) {
                throw new Error('Custom short ID already in use');
            }
        }

        const url = new Url({ shortId, longUrl, customShortId });
        await url.save();
        return url;
    }

    // Get all URLs
    static async getAllUrls(
        page: number = 1,
        limit: number = 10,
        filters: { [key: string]: any } = {},
        sort: { [key: string]: 1 | -1 } = { createdAt: -1 }
    ) {
        const skip = (page - 1) * limit;

        // Build the query dynamically based on filters
        const query: { [key: string]: any } = {};
        for (const [key, value] of Object.entries(filters)) {
            if (key === 'shortId' || key === 'longUrl' || key === 'customShortId') {
                query[key] = { $regex: value, $options: 'i' }; // Case-insensitive search
            } else if (key === 'clicks') {
                query[key] = Number(value);
            } else if (key === 'createdAt') {
                query[key] = { $gte: new Date(value) }; // Filter by date
            }
        }

        const [urls, total] = await Promise.all([
            Url.find(query)
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Url.countDocuments(query),
        ]);

        return {
            data: urls,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // Get a URL by shortId
    static async getUrlByShortId(shortId: string) {
        const url = await Url.findOne({ $or: [{ shortId }, { customShortId: shortId }] });
        if (!url) {
            const error = new Error('URL not found');
            (error as any).status = 404;
            throw error;
        }
        return url;
    }

    // Update a URL
    static async updateUrl(
        shortId: string,
        updates: { longUrl?: string; customShortId?: string }
    ) {
        const url = await Url.findOne({ $or: [{ shortId }, { customShortId: shortId }] });

        if (!url) {
            const error = new Error('URL not found');
            (error as any).status = 404; // Set custom error status
            throw error;
        }

        // Update long URL if provided
        if (updates.longUrl) {
            url.longUrl = updates.longUrl;
        }

        // Update customShortId if provided and check for conflicts
        if (updates.customShortId) {
            const existingUrl = await Url.findOne({ customShortId: updates.customShortId });

            // Ensure the customShortId is not already taken by another URL
            if (existingUrl && existingUrl.shortId !== shortId) {
                const error = new Error('Custom short ID already in use');
                (error as any).status = 400; // Set a Bad Request status
                throw error;
            }

            url.customShortId = updates.customShortId;
        }

        await url.save();
        return url;
    }


    // Delete a URL
    static async deleteUrl(shortId: string) {
        const url = await Url.findOneAndDelete({ $or: [{ shortId }, { customShortId: shortId }] });
        if (!url) {
            throw new Error('URL not found');
        }
        return url;
    }
}

export default UrlService;