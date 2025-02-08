export interface Url {
    shortId: string;
    longUrl: string;
    customShortId?: string;
    createdAt: string;
    clicks: number;
}

interface ShortenedUrl {
    _id: string;
    shortId: string;
    longUrl: string;
    clicks: number;
    createdAt: string;
    __v: number;
    customShortId?: string; 
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface fetchUrlsApiResponse {
    data: ShortenedUrl[];
    pagination: Pagination;
}
