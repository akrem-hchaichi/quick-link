import React, { useState } from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    TablePagination,
    TableSortLabel,
} from '@mui/material';
import { Url } from '../types/url';
import { useAppDispatch } from '../store/hooks';
import { deleteUrlById, updateUrlById } from '../store/url/urlThunks';
import EditUrlDialog from './EditUrlDialog';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';


interface UrlTableProps {
    urls: Url[];
}

type Order = 'asc' | 'desc';

const UrlTable: React.FC<UrlTableProps> = ({ urls }) => {
    const dispatch = useAppDispatch();
    const [editUrl, setEditUrl] = useState<Url | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Url>('createdAt');

    const handleDelete = async (shortId: string) => {
        if (window.confirm('Are you sure you want to delete this URL?')) {
            await dispatch(deleteUrlById(shortId));
        }
    };

    const handleUpdate = (url: Url) => {
        setEditUrl(url);
    };

    const handleSave = async (updatedUrl: Url) => {
        try {
            await dispatch(
                updateUrlById({
                    shortId: updatedUrl.shortId,
                    urlData: { longUrl: updatedUrl.longUrl, customShortId: updatedUrl.customShortId },
                }),
            ).unwrap();
            toast.success('URL updated successfully!');
            setEditUrl(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Failed to update URL. Please try again.');
        }
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (property: keyof Url) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedUrls = urls.slice().sort((a, b) => {
        if (orderBy !== "customShortId") {
            if (a[orderBy] < b[orderBy]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[orderBy] > b[orderBy]) {
                return order === 'asc' ? 1 : -1;
            }
        }

        return 0;
    });

    const paginatedUrls = sortedUrls.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'shortId'}
                                    direction={orderBy === 'shortId' ? order : 'asc'}
                                    onClick={() => handleSort('shortId')}
                                >
                                    Short ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'customShortId'}
                                    direction={orderBy === 'customShortId' ? order : 'asc'}
                                    onClick={() => handleSort('customShortId')}
                                >
                                    custom ShortId
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'longUrl'}
                                    direction={orderBy === 'longUrl' ? order : 'asc'}
                                    onClick={() => handleSort('longUrl')}
                                >
                                    Long URL
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'clicks'}
                                    direction={orderBy === 'clicks' ? order : 'asc'}
                                    onClick={() => handleSort('clicks')}
                                >
                                    Clicks
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'createdAt'}
                                    direction={orderBy === 'createdAt' ? order : 'asc'}
                                    onClick={() => handleSort('createdAt')}
                                >
                                    Created At
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUrls.map((url) => (
                            <TableRow key={url.shortId}>
                                <TableCell>{url.shortId}</TableCell>
                                <TableCell>{url.customShortId}</TableCell>
                                <TableCell>{url.longUrl}</TableCell>
                                <TableCell>{url.clicks}</TableCell>
                                <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleUpdate(url)}
                                            aria-label="edit"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(url.shortId)}
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={urls.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Edit Dialog */}
            {editUrl && (
                <EditUrlDialog
                    url={editUrl}
                    onSave={handleSave}
                    onClose={() => setEditUrl(null)}
                />
            )}
        </>
    );
};

export default UrlTable;