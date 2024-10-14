import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Edit2, Trash2, Eye, Plus, Search } from 'lucide-react';
import WidgetAchievement from "../../../Components/StudentPortalComp/Widget/WidgetAchievement";
import WidgetPopUpDelete from "../../../Components/StudentPortalComp/WidgetPopUpDelete";
import "../../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";
import "../../../css/StudentPortalStyles/StudentButtonGroup.css";

const Achievements = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [isViewMode, setIsViewMode] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const nodeRef = useRef(null);
    useEffect(() => {
        fetchAchievements();
    }, []);

    useEffect(() => {
        // Reset to first page when search term changes
        setCurrentPage(1);
    }, [searchTerm]);

    const fetchAchievements = async (page = 1) => {
        setIsLoading(true);
        setError(null);
        try {
            const token =
                sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            const apiUrl = `${import.meta.env.VITE_BASE_URL}api/student/achievementsList`;
            //console.log('Fetching from URL:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: page,
                    per_page: itemsPerPage,
                    search: searchTerm // Add search term to the request
                })
            });

            //console.log('Response status:', response.status);

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized access. Please log in again.');
                } else if (response.status === 404) {
                    throw new Error('API endpoint not found. Please check the URL.');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            //console.log('API response:', result);

            // Directly set the data from the API response
            setData(result.data.data || []);
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

    // Change page
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= paginationInfo.lastPage) {
            setCurrentPage(pageNumber);
            fetchAchievements(pageNumber);
        }
    };

    // Generate page numbers
    const getPageNumbers = () => {
        const totalPages = paginationInfo.lastPage;
        const current = paginationInfo.currentPage;
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (current <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (current >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = current - 1; i <= current + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const saveEntry = async (entry) => {
        try {
            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            const url = entry.id
                ? `${import.meta.env.VITE_BASE_URL}api/student/editAchievement?id=${entry.id}`
                : `${import.meta.env.VITE_BASE_URL}api/student/addAchievement`;

            const formData = new FormData();
            formData.append('achievement_name', entry.achievement_name);
            formData.append('date', entry.date);
            formData.append('title', entry.title);
            formData.append('awarded_by', entry.awarded_by);

            // Handle file upload logic
            if (entry.achievement_media instanceof File) {
                // If a new file is selected, append it to formData
                formData.append('achievement_media', entry.achievement_media);
                //console.log('New file being uploaded:', entry.achievement_media.name);
            } else if (entry.id && entry.achievement_media && typeof entry.achievement_media === 'string') {
                // If editing and the file hasn't changed, don't send the achievement_media field
                console.log('Existing file, not changing:', entry.achievement_media);
            } else if (!entry.id) {
                // If adding a new entry and no file is selected, send an empty string
                formData.append('achievement_media', '');
               // console.log('No file selected for new entry');
            }
            // Log the formData contents
          /*  for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }*/

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();
           // console.log('Save/Edit response:', result);

            if (result.success) {
                setIsPopupOpen(false);
                setCurrentItem(null);
                fetchAchievements(); // Refresh the list after adding/updating
            }

            return result; // Return the entire result object
        } catch (error) {
            console.error('Error saving achievement:', error);
            return { success: false, message: error.message || 'Failed to save achievement. Please try again.' };
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
            const token =
                sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            if (!itemToDelete || !itemToDelete.id) {
                throw new Error('No item selected for deletion');
            }

            const url = `${import.meta.env.VITE_BASE_URL}api/student/deleteAchievement?id=${itemToDelete.id}`;
            const requestBody = {
                id: itemToDelete.id,
                type: 'delete'
            };

         /*   console.log('Delete Achievement Request:');
            console.log('URL:', url);
            console.log('Method: POST');
            console.log('Headers:', {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            });
            console.log('Request Body:', JSON.stringify(requestBody, null, 2));*/

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

           // console.log('Response status:', response.status);
           // console.log('Response headers:', response.headers);

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || `HTTP error! status: ${response.status}`);
                }
               // console.log('Delete response:', result);
            } else {
                const text = await response.text();
                console.error('Received non-JSON response:', text);
                throw new Error(`Received non-JSON response. Status: ${response.status}`);
            }

            setIsDeletePopupOpen(false);
            setItemToDelete(null);
            fetchAchievements(); // Refresh the list after deleting
        } catch (error) {
            console.error('Error deleting achievement:', error);
            setError(error.message || 'Failed to delete achievement. Please try again.');
        }finally {
            setIsDeleting(false); // End loading
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

    const filteredData = searchTerm
        ? data.filter(item =>
            item.achievement_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.title_obtained.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.date.includes(searchTerm) ||
            item.awarded_by.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : data;

    return (
        <div className='transcript-search-bar-padmar'>
            <div className="transcript-search-bar-container">
                <span className="me-3 align-self-center">Show</span>
                <select className="show-option-table me-3"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                <span className="me-2 align-self-center">entries</span>
                <div className="transcript-search-bar-sas  ">
                    <Search size={20} style={{ color: '#9E9E9E' }} />
                    <input
                        type="text" placeholder="Search..." className="form-control custom-input-size"
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
            <div style={{ overflowX: 'auto' }}>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
                <table className="w-100">
                    <thead>
                        <tr >
                            <th className="border-bottom p-2 fw-normal">Events</th>
                            <th className="border-bottom p-2 fw-normal text-end">Title Obtained</th>
                            <th className="border-bottom p-2 fw-normal text-end">Date of Achievement</th>
                            <th className="border-bottom p-2 fw-normal text-end">Uploads</th>
                            <th className="border-bottom p-2 text-end fw-normal">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TransitionGroup component={null}>
                            {filteredData.map((item) => (
                                <CSSTransition key={item.id} timeout={300} classNames="fade">
                                    <tr>
                                        <td className="border-bottom py-2 px-2">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className="file-title mb-1 sac-name-restrict">{item.achievement_name}</div>
                                                    <div className="file-date">{item.awarded_by}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="border-bottom p-2 text-end file-date">{item.title_obtained}</td>
                                        <td className="border-bottom p-2 text-end">{item.date}</td>
                                        <td className="border-bottom p-2 text-end file-date">{item.achievement_media}</td>
                                        <td className="border-bottom p-2">
                                            <div className="d-flex justify-content-end align-items-center">
                                                <Trash2 size={20} className="iconat-trash mx-2" onClick={() => openDeletePopup(item)} />
                                                <Edit2 size={20} className="iconat mx-2" onClick={() => editEntry(item)} />
                                                <Eye size={20} className="iconat ms-2" onClick={() => viewEntry(item)} />
                                            </div>
                                        </td>
                                    </tr>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </tbody>
                </table>
            ) : (
                <div>No achievements found</div>
            )}
            </div>
            {paginationInfo.lastPage > 1 && (
            <div className="pagination">
                <button onClick={() => paginate(paginationInfo.currentPage - 1)} disabled={paginationInfo.currentPage === 1}>
                    &lt;
                </button>
                {getPageNumbers().map((number, index) => (
                    <button
                        key={index}
                        onClick={() => number !== '...' ? paginate(number) : null}
                        className={paginationInfo.currentPage === number ? 'active' : ''}
                        disabled={number === '...'}
                    >
                        {number}
                    </button>
                ))}
                <button onClick={() => paginate(paginationInfo.currentPage + 1)} disabled={paginationInfo.currentPage === paginationInfo.lastPage}>
                    &gt;
                </button>
            </div>
            )}
            <WidgetAchievement
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

export default Achievements;