export interface IUrl {
    shortId: string;
    longUrl: string;
    customShortId?: string;
    createdAt?: Date;
    clicks?: number;
}