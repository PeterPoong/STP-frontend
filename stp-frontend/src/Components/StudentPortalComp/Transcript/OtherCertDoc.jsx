import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Trash2, Eye, Plus, Search, FileText, Edit2 } from 'lucide-react';
import WidgetFileUpload from "../../../Components/StudentPortalComp/WidgetFileUpload";
import WidgetPopUpDelete from "../../../Components/StudentPortalComp/WidgetPopUpDelete";
import "../../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";
import "../../../css/StudentPortalStyles/StudentButtonGroup.css";
import File4 from "../../../assets/StudentPortalAssets/File4.png"
import WidgetBackground from "../../../Components/StudentPortalComp/WidgetBackground";

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
    const [isDeleting, setIsDeleting] = useState(false);

    const nodeRef = useRef(null);

    // Fetch data when currentPage or itemsPerPage changes
    useEffect(() => {
        fetchOtherDocsCerts();
    }, [currentPage, itemsPerPage]);

    // Adjust currentPage if it exceeds lastPage
    useEffect(() => {
        if (paginationInfo.lastPage) {
            if (currentPage > paginationInfo.lastPage) {
                setCurrentPage(paginationInfo.lastPage || 1);
            }
        }
    }, [paginationInfo.lastPage]);

    // Reset currentPage when searchTerm changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const normalizeItem = (item) => {
        return {
            id: item.id,
            name: item.name || item.certificate_name,
            media: item.media || item.certificate_media,
            created_at: item.created_at || item.createdAt || 'No date'
        };
    };

    const fetchOtherDocsCerts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            const apiUrl = `${import.meta.env.VITE_BASE_URL}api/student/otherFileCertList`;

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

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized access. Please log in again.');
                } else if (response.status === 404) {
                    throw new Error('API endpoint not found. Please check the URL.');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            const otherDocsArray = (result.data.data || []).map(normalizeItem);

            setData(otherDocsArray);
            setPaginationInfo({
                currentPage: result.data.current_page,
                lastPage: result.data.last_page,
                total: result.data.total,
                perPage: result.data.per_page
            });

            // Adjust currentPage if necessary
            if (currentPage > result.data.last_page && result.data.last_page !== 0) {
                setCurrentPage(result.data.last_page);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
            setError(error.message || 'Failed to load documents. Please try again later.');
            setData([]); // Set data to an empty array in case of error
        } finally {
            setIsLoading(false);
        }
    };

    // Filter data based on search term
    const filteredData = data.filter(item =>
    (item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.media?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Function to change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= paginationInfo.lastPage; i++) {
        pageNumbers.push(i);
    }

    // Function to add new entry or update existing entry
    const saveEntry = async (entry) => {
        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
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

            if (!result.success) {
                return result; // Return the error result to be handled in WidgetFileUpload
            }

            setIsPopupOpen(false);
            setCurrentItem(null);

            // Fetch updated data
            fetchOtherDocsCerts();

            return result;
        } catch (error) {
            console.error('Error saving document:', error);
            return { success: false, message: error.message || 'Failed to save document. Please try again.' };
        }
    };

    // Function to open delete popup
    const openDeletePopup = (item) => {
        setItemToDelete(item);
        setIsDeletePopupOpen(true);
    };

    // Function to delete entry
    const deleteEntry = async () => {
        setIsDeleting(true);
        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
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

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            setIsDeletePopupOpen(false);
            setItemToDelete(null);

            // Fetch updated data and pagination info
            fetchOtherDocsCerts();
        } catch (error) {
            console.error('Error deleting document:', error);
            setError(error.message || 'Failed to delete document. Please try again.');
        } finally {
            setIsDeleting(false);
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
    if (error) return (
        <div>
            <p>Error: {error}</p>
            <button onClick={fetchOtherDocsCerts}>Retry</button>
        </div>
    );

    return (
        <div className="transcript-search-bar-padmar">
            <div className="transcript-search-bar-container">
                <span className="me-3 align-self-center">Show</span>
                <select
                    className="show-option-table me-3"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset to first page when items per page change
                    }}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                <span className="me-2 align-self-center">entries</span>
                <div className="transcript-search-bar-sas">
                    <Search size={20} style={{ color: '#9E9E9E' }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="form-control custom-input-size"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="button-table px-5 py-1 ml-auto" onClick={() => {
                    setCurrentItem(null);
                    setIsPopupOpen(true);
                }}>
                    ADD NEW
                </button>
            </div>
            <div className="transcript-responsive-table-div">
                {filteredData.length > 0 ? (
                    <table className="w-100 transcript-responsive-table">
                        <thead>
                            <tr>
                                <th className="border-bottom fw-normal ps-2">Files</th>
                                <th className="border-bottom p-2 fw-normal text-end">Filename</th>
                                <th className="border-bottom p-2 fw-normal text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TransitionGroup component={null}>
                                {filteredData.map((item) => (
                                    <CSSTransition key={item.id || item.certificate_name} timeout={300} classNames="fade">
                                        <tr>
                                            <td className="border-bottom py-2 px-2" data-label="Files">
                                                <div className="d-flex align-items-center">
                                                    <FileText className="file-icon me-2 transcript-responsive-display" />
                                                    <div className="transcript-responsive-table-text-end">
                                                        <div className="file-title mb-1 sac-name-restrict">{item.name}</div>
                                                        <div className="file-date">{item.created_at || 'No date'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-bottom p-2 text-end " data-label="Filename">
                                                <div className="text-secondary transcript-responsive-table-workbreak">
                                                    {item.media || 'No file'}
                                                </div>
                                            </td>
                                            <td className="border-bottom p-2">
                                                <div className="d-flex justify-content-end align-items-center">
                                                    <Trash2 size={18} className="iconat-trash mx-2" onClick={() => openDeletePopup(item)} />
                                                    <Edit2 size={18} className="iconat mx-2" onClick={() => editEntry(item)} />
                                                    <Eye size={18} className="iconat ms-2" onClick={() => viewEntry(item)} />
                                                </div>
                                            </td>
                                        </tr>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </tbody>
                    </table>
                ) : (
                    <div style={{ height: '225px' }}>
                        <WidgetBackground>

                            <div style={{ padding: '20px' }} className="d-flex justify-content-center" >
                                <div className="d-flex flex-column justify-content-center ">
                                    <h1 className="testing-word-two">No other document or certificate have been found</h1>
                                    <p className="testing-word-two">Please upload any additional information that you feel would be beneficial to your application.</p>
                                </div>
                                <img src={File4} className="ms-5 me-4" style={{ height: '100px', width: '100px' }} />
                               
                            </div>
                        </WidgetBackground>
                    </div>
                )}
            </div>
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
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default OtherCertDoc;
