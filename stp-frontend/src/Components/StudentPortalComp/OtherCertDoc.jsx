import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Trash2, Eye, Plus, Search, FileText, Edit2 } from 'lucide-react';
import WidgetFileUpload from "../../Components/StudentPortalComp/WidgetFileUpload";
import WidgetPopUpDelete from "../../Components/StudentPortalComp/WidgetPopUpDelete";
import "../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";
import "../../css/StudentPortalStyles/StudentButtonGroup.css";

const OtherCertDoc = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);

    const nodeRef = useRef(null);
    useEffect(() => {
        fetchOtherDocsCerts();
    }, [currentPage, itemsPerPage]);


    const normalizeItem = (item) => {
        return {
            id: item.id,
            name: item.name || item.certificate_name,
            media: item.media || item.certificate_media,
            createdAt: item.created_at || item.createdAt || 'No date'
        };
    };

    const fetchOtherDocsCerts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token =
                sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            const apiUrl = `${import.meta.env.VITE_BASE_URL}api/student/otherFileCertList`;
            console.log('Fetching from URL:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: currentPage,
                    per_page: itemsPerPage
                })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized access. Please log in again.');
                } else if (response.status === 404) {
                    throw new Error('API endpoint not found. Please check the URL.');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('API response:', result);

            // Correctly access the nested data array
            const otherDocsArray = (result.data.data || []).map(normalizeItem);

            setData(otherDocsArray);
            setPaginationInfo({
                currentPage: result.data.current_page,
                lastPage: result.data.last_page,
                total: result.data.total,
                perPage: result.data.per_page
            });
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setError(error.message || 'Failed to load achievements. Please try again later.');
            setData([]); // Set data to an empty array in case of error
        } finally {
            setIsLoading(false);
        }
    };


    // Filter data based on search term
    const filteredData = Array.isArray(data) ? data.filter(item =>
    (item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.media?.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= paginationInfo.lastPage; i++) {
        pageNumbers.push(i);
    }

    // Function to add new entry or update existing entry                                    
    const saveEntry = async (entry) => {
        try {
            const token =
                sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            const url = entry.id
                ? `${import.meta.env.VITE_BASE_URL}api/student/editOtherCertFile?id=${entry.id}`
                : `${import.meta.env.VITE_BASE_URL}api/student/addOtherCertFile`;

            const formData = new FormData();
            formData.append('certificate_name', entry.name || entry.certificate_name);
            if (entry.media instanceof File) {
                formData.append('certificate_media', entry.media);
            } else if (entry.certificate_media instanceof File) {
                formData.append('certificate_media', entry.certificate_media);
            }

            // Log form data for debugging
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Save/Edit response:', result);

            if (!result.success) {
                return result; // Return the error result to be handled in WidgetFileUpload
            }

            setIsPopupOpen(false);
            setCurrentItem(null);
            fetchOtherDocsCerts();  // Refresh the list after adding/updating
            return result;
        } catch (error) {
            console.error('Error saving certificate:', error);
            return { success: false, message: error.message || 'Failed to save certificate. Please try again.' };
        }
    };

    // Function to open delete popup
    const openDeletePopup = (item) => {
        setItemToDelete(item);
        setIsDeletePopupOpen(true);
    };

    // Function to delete entry
    const deleteEntry = async () => {
        try {
            const token =
                sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            if (!itemToDelete || !itemToDelete.id) {
                throw new Error('No item selected for deletion');
            }

            const url = `${import.meta.env.VITE_BASE_URL}api/student/deleteOtherCertFile?id=${itemToDelete.id}`;
            const requestBody = {
                id: itemToDelete.id,
                type: 'delete'
            };

            console.log('Delete Achievement Request:');
            console.log('URL:', url);
            console.log('Method: POST');
            console.log('Headers:', {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            });
            console.log('Request Body:', JSON.stringify(requestBody, null, 2));

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || `HTTP error! status: ${response.status}`);
                }
                console.log('Delete response:', result);
            } else {
                const text = await response.text();
                console.error('Received non-JSON response:', text);
                throw new Error(`Received non-JSON response. Status: ${response.status}`);
            }

            setIsDeletePopupOpen(false);
            setItemToDelete(null);
            fetchOtherDocsCerts(); // Refresh the list after deleting
        } catch (error) {
            console.error('Error deleting achievement:', error);
            setError(error.message || 'Failed to delete achievement. Please try again.');
        }
    };

    // Function to open popup for editing
    const editEntry = (item) => {
        setCurrentItem(item);
        setIsViewMode(false);
        setIsPopupOpen(true);
    };

    // Function to open popup for viewing
    const viewEntry = (item) => {
        setCurrentItem(item);
        setIsViewMode(true);
        setIsPopupOpen(true);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;



    return (
        <div className='p-5'>
            <div className="mb-4">
                <div className="d-flex justify-content-start align-item-centger flex-wrap ">
                    <span className="me-3 align-self-center">Show</span>
                    <select className="show-option-table me-3"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="me-2 align-self-center">entries</span>
                    <input
                        type="search"
                        className="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="button-table px-5 py-1 ml-auto" onClick={() => {
                        setCurrentItem(null);
                        setIsPopupOpen(true);
                    }}>
                        ADD NEW
                    </button>
                </div>
            </div>

            {Array.isArray(filteredData) && filteredData.length > 0 ? (
                <table className="w-100 ">
                    <thead>
                        <tr>
                            <th className="border-bottom fw-normal ps-2">Files</th>
                            <th className="border-bottom p-2 fw-normal text-end">Filename</th>
                            <th className="border-bottom p-2  fw-normal text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TransitionGroup component={null}>
                            {filteredData.map((item) => (
                                <CSSTransition key={item.id || item.certificate_name} timeout={300} classNames="fade">
                                    <tr>
                                        <td className="border-bottom py-2 px-2">
                                            <div className="d-flex align-items-center ">
                                                <FileText className="file-icon me-2" />
                                                <div>
                                                    <div className="file-title mb-1">{item.name}</div>
                                                    <div className="file-date">{item.created_at || 'No date'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="border-bottom p-2 text-end text-secondary">{item.media || 'No file'}</td>
                                        <td className="border-bottom p-2">
                                            <div className="d-flex justify-content-end align-items-center">
                                                <Trash2 size={18}  className="iconat-trash mx-2" onClick={() => openDeletePopup(item)} />
                                                <Edit2 size={18}  className="iconat mx-2" onClick={() => editEntry(item)} />
                                                <Eye size={18}  className="iconat ms-2" onClick={() => viewEntry(item)} />
                                            </div>
                                        </td>
                                    </tr>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </tbody>
                </table>
            ) : (
                <div>No other certificate or documentation found</div>
            )}
            {paginationInfo.lastPage > 1 && (
                <div className="pagination">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        &lt;
                    </button>
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={currentPage === number ? 'active' : ''}
                        >
                            {number}
                        </button>
                    ))}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === paginationInfo.lastPage}>
                        &gt;
                    </button>
                </div>
            )}

            <WidgetFileUpload
                isOpen={isPopupOpen}
                onClose={() => {
                    setIsPopupOpen(false);
                    setCurrentItem(null);
                    setIsViewMode(false);
                }}
                onSave={saveEntry}
                item={currentItem}
                isViewMode={isViewMode}
            />

            <WidgetPopUpDelete
                isOpen={isDeletePopupOpen}
                onClose={() => {
                    setIsDeletePopupOpen(false);
                    setItemToDelete(null);
                }}
                onConfirm={deleteEntry}
            />
        </div>
    );
};

export default OtherCertDoc;