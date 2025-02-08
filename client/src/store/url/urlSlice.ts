import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Url } from '../../types/url';

interface UrlState {
    urls: Url[];
    currentUrl: Url | null;
    loading: boolean;
    error: string | null;
}

const initialState: UrlState = {
    urls: [],
    currentUrl: null,
    loading: false,
    error: null,
};

const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setUrls: (state, action: PayloadAction<Url[]>) => {
            state.urls = action.payload;
        },
        setCurrentUrl: (state, action: PayloadAction<Url | null>) => {
            state.currentUrl = action.payload;
        },
        addUrl: (state, action: PayloadAction<Url>) => {
            state.urls.push(action.payload);
        },
        updateUrl: (state, action: PayloadAction<Url>) => {
            const index = state.urls.findIndex((u) => u.shortId === action.payload.shortId);
            if (index !== -1) {
                state.urls[index] = action.payload;
            }
        },
        deleteUrl: (state, action: PayloadAction<string>) => {
            state.urls = state.urls.filter((u) => u.shortId !== action.payload);
        },
    },
});

export const {
    setLoading,
    setError,
    setUrls,
    setCurrentUrl,
    addUrl,
    updateUrl,
    deleteUrl,
} = urlSlice.actions;

export default urlSlice.reducer;