import React, { useState, useEffect,useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Edit2, Trash2, Eye, Plus, Search } from 'lucide-react';
import WidgetAchievement from "../../Components/StudentPortalComp/WidgetAchievement";
import WidgetPopUpDelete from "../../Components/StudentPortalComp/WidgetPopUpDelete";
import "../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";

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

    const nodeRef =useRef(null);
    useEffect(() => {
        fetchAchievements();
    }, [currentPage, itemsPerPage]);

    const fetchAchievements = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const apiUrl = `${import.meta.env.VITE_BASE_URL}api/student/achievementsList`;
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

            

            setData(result.data || []);
            setPaginationInfo({
                currentPage: result.current_page,
                lastPage: result.last_page,
                total: result.total,
                perPage: result.per_page
            });
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setError(error.message || 'Failed to load achievements. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.achievement_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title_obtained?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.date?.includes(searchTerm)
    );

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= paginationInfo.lastPage; i++) {
        pageNumbers.push(i);
    }

    // Function to add new entry or update existing entry
   // Function to add new entry or update existing entry
   const saveEntry = async (entry) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const url = entry.id
            ? `${import.meta.env.VITE_BASE_URL}api/student/editAchievement/${entry.id}`
            : `${import.meta.env.VITE_BASE_URL}api/student/addAchievement`;

        const formData = new FormData();
        formData.append('achievement_name', entry.achievement_name);
        formData.append('date', entry.date);
        formData.append('title', entry.title);
        formData.append('awarded_by', entry.awarded_by);
        if (entry.achievement_media instanceof File) {
            formData.append('achievement_media', entry.achievement_media);
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Save/Edit response:', result);

        setIsPopupOpen(false);
        setCurrentItem(null);
        fetchAchievements(); // Refresh the list after adding/updating
    } catch (error) {
        console.error('Error saving achievement:', error);
        setError(error.message || 'Failed to save achievement. Please try again.');
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
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/deleteAchievement/${itemToDelete.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'delete'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Delete response:', result);

            setIsDeletePopupOpen(false);
            setItemToDelete(null);
            fetchAchievements(); // Refresh the list after deleting
        } catch (error) {
            console.error('Error deleting achievement:', error);
            setError(error.message || 'Failed to delete achievement. Please try again.');
        }
    };


    // Function to open popup for editing
    const editEntry = (item) => {
        setCurrentItem(item);
        setIsPopupOpen(true);
    };

    // Function to open popup for viewing
    const viewEntry = (item) => {
        setCurrentItem(item);
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
                    <button className="button-table w-25 px-5 ml-auto" onClick={() => {
                        setCurrentItem(null);
                        setIsPopupOpen(true);
                    }}>
                        ADD NEW
                    </button>
                </div>
            </div>

            {filteredData.length > 0 ? (
                <table className="w-100 ">
                <thead>
                    <tr>
                        <th className="border-bottom p-2">Events</th>
                        <th className="border-bottom p-2">Title Obtained</th>
                        <th className="border-bottom p-2">Date of Achievement</th>
                        <th className="border-bottom p-2">Uploads</th>
                        <th className="border-bottom p-2 text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <TransitionGroup component={null}>
                        {filteredData.map((item) => (
                            <CSSTransition
                                key={item.id || item.achievement_name}
                                timeout={700}
                                classNames="row"
                                nodeRef={nodeRef}
                            >
                                <tr ref={nodeRef}>
                                    <td className="border-bottom p-4">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <div className="file-title">{item.achievement_name}</div>
                                                <div className="file-date">{item.awarded_by}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-bottom p-2 text-end file-date">{item.title_obtained}</td>
                                    <td className="border-bottom p-2 text-end">{item.date}</td>
                                    <td className="border-bottom p-2 text-end file-date">{item.achievement_media}</td>
                                    <td className="border-bottom p-2">
                                        <div className="d-flex justify-content-end align-items-center">
                                            <Trash2 className="iconat-trash" onClick={() => openDeletePopup(item)} />
                                            <Edit2 className="iconat" onClick={() => editEntry(item)} />
                                            <Eye className="iconat" onClick={() => viewEntry(item)} />
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

            <WidgetAchievement
                isOpen={isPopupOpen}
                onClose={() => {
                    setIsPopupOpen(false);
                    setCurrentItem(null);
                }}
                onSave={saveEntry}
                item={currentItem}
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

export default Achievements;