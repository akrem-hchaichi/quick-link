import UrlService from '../../src/services/urlService';
import Url from '../../src/models/urlModel';

describe('UrlService', () => {
    beforeEach(async () => {
        await Url.deleteMany({});
    });

    describe('createUrl', () => {
        it('should create a new URL', async () => {
            const longUrl = 'https://www.example.com';
            const result = await UrlService.createUrl(longUrl);

            expect(result).toHaveProperty('shortId');
            expect(result.longUrl).toBe(longUrl);
            expect(result.clicks).toBe(0);
        });

        it('should throw an error if customShortId is already in use', async () => {
            const longUrl = 'https://www.example.com';
            const customShortId = 'custom123';

            // Create a URL with the customShortId
            await UrlService.createUrl(longUrl, customShortId);

            // Try to create another URL with the same customShortId
            await expect(UrlService.createUrl(longUrl, customShortId)).rejects.toThrow(
                'Custom short ID already in use'
            );
        });
    });

    describe('getLongUrl', () => {
        it('should return the long URL for a valid shortId', async () => {
            const longUrl = 'https://www.example.com';
            const url = await UrlService.createUrl(longUrl);

            const result = await UrlService.getUrlByShortId(url.shortId);
            expect(result.longUrl).toBe(longUrl);
        });

        it('should throw an error for an invalid shortId', async () => {
            await expect(UrlService.getUrlByShortId('invalidShortId')).rejects.toThrow('URL not found');
        });
    });

    describe('getAllUrls', () => {
        it('should return all URLs with pagination', async () => {
            // Create multiple URLs
            await UrlService.createUrl('https://www.example.com');
            await UrlService.createUrl('https://www.anotherexample.com');

            const result = await UrlService.getAllUrls(1, 10);
            expect(result.data.length).toBe(2);
            expect(result.pagination.total).toBe(2);
        });
    });

    describe('updateUrl', () => {
        it('should update the longUrl of a URL', async () => {
            const longUrl = 'https://www.example.com';
            const url = await UrlService.createUrl(longUrl);

            const updatedUrl = await UrlService.updateUrl(url.shortId, {
                longUrl: 'https://www.updated-example.com',
            });

            expect(updatedUrl.longUrl).toBe('https://www.updated-example.com');
        });

        it('should throw an error if the URL does not exist', async () => {
            await expect(
                UrlService.updateUrl('invalidShortId', { longUrl: 'https://www.example.com' })
            ).rejects.toThrow('URL not found');
        });
    });

    describe('deleteUrl', () => {
        it('should delete a URL by shortId', async () => {
            const longUrl = 'https://www.example.com';
            const url = await UrlService.createUrl(longUrl);

            const result = await UrlService.deleteUrl(url.shortId);
            expect(result).toHaveProperty('shortId', url.shortId);

            // Verify the URL is deleted
            const deletedUrl = await Url.findOne({ shortId: url.shortId });
            expect(deletedUrl).toBeNull();
        });

        it('should throw an error if the URL does not exist', async () => {
            await expect(UrlService.deleteUrl('invalidShortId')).rejects.toThrow('URL not found');
        });
    });
});