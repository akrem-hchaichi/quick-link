import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Url } from '../../types/url';
import { setLoading, setError, setUrls, setCurrentUrl, addUrl, updateUrl, deleteUrl } from './urlSlice';

const API_BASE_URL = 'http://localhost:5000/api';

// Create a new URL
export const createUrl = createAsyncThunk(
  'url/createUrl',
  async (urlData: { longUrl: string; customShortId?: string }, { dispatch }) => {
    dispatch(setLoading(true));

    const payload = {
      longUrl: urlData.longUrl,
      ...(urlData.customShortId && { customShortId: urlData.customShortId }),
    };

    try {
      const response = await axios.post<Url>(`${API_BASE_URL}/urls`, payload);
      dispatch(addUrl(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || 'Failed to create URL'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

// Get all URLs
export const fetchUrls = createAsyncThunk(
  'url/fetchUrls',
  async (
    queryParams: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: string;
      shortId?: string;
      longUrl?: string;
      customShortId?: string;
      clicks?: number;
      createdAt?: string;
    },
    { dispatch }
  ) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get<Url[]>(`${API_BASE_URL}/urls`, {
        params: queryParams,
      });
      dispatch(setUrls(response.data.data));
      return response.data;
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || 'Failed to fetch URLs'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Get a URL by shortId
export const fetchUrlByShortId = createAsyncThunk('url/fetchUrlByShortId', async (shortId: string, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get<Url>(`${API_BASE_URL}/urls/${shortId}`);
    dispatch(setCurrentUrl(response.data));
    return response.data;
  } catch (error: any) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch URL'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
});

// Update a URL
export const updateUrlById = createAsyncThunk(
  'url/updateUrl',
  async (
    {
      shortId,
      urlData,
    }: {
      shortId: string;
      urlData: { longUrl?: string; customShortId?: string };
    },
    { dispatch }
  ) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put<Url>(`${API_BASE_URL}/urls/${shortId}`, urlData);
      dispatch(updateUrl(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || 'Failed to update URL'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Delete a URL
export const deleteUrlById = createAsyncThunk('url/deleteUrl', async (shortId: string, { dispatch }) => {
  dispatch(setLoading(true));
  try {
    await axios.delete(`${API_BASE_URL}/urls/${shortId}`);
    dispatch(deleteUrl(shortId));
  } catch (error: any) {
    dispatch(setError(error.response?.data?.message || 'Failed to delete URL'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
});
