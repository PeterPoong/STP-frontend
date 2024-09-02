import React, { useState,useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Edit2, Trash2, Eye, Plus, Search } from 'lucide-react';
import WidgetClub from "../../Components/StudentPortalComp/WidgetClub";
import WidgetPopUpDelete from "../../Components/StudentPortalComp/WidgetPopUpDelete";
import "../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";

const CoCurriculum = () => {
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
    // Filter data based on search term


    const normalizeItem = (item) => {
        return {
            id: item.id,
            club_name: item.club_name || '',
            student_position: item.student_position || item.position || '',
            location: item.location || item.institute_name || '',
            year: item.year || ''
        };
    };

    useEffect(() => {
        fetchCocurriculum();
    }, []);

    const fetchCocurriculum = async () => {
        console.log('Fetching co-curriculum data...');
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const apiUrl = `${import.meta.env.VITE_BASE_URL}api/student/co-curriculumList`;
            console.log('Fetching from URL:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
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
            console.log('Fetched data:', result);

            let coCurriculumArray = [];
            if (result.data && Array.isArray(result.data)) {
                coCurriculumArray = result.data.map(normalizeItem);
            } else if (result.data && result.data.data && Array.isArray(result.data.data)) {
                coCurriculumArray = result.data.data.map(normalizeItem);
            } else {
                console.warn('Unexpected data structure:', result);
            }

            console.log('Normalized data:', coCurriculumArray);

            setData(coCurriculumArray);
        } catch (error) {
            console.error('Error fetching co-curriculum:', error);
            setError(error.message || 'Failed to load co-curriculum. Please try again later.');
            setData([]); // Set data to an empty array in case of error
        } finally {
            setIsLoading(false);
        }
    };
    
    
    const filteredData = Array.isArray(data) ? data.filter(item =>
        (item?.club_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.student_position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.location?.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];



    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Function to add new entry or update existing entry
    const saveEntry = async (entry) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const url = entry.id
                ? `${import.meta.env.VITE_BASE_URL}api/student/editCocurriculum?id=${entry.id}`
                : `${import.meta.env.VITE_BASE_URL}api/student/addCocurriculumList`;

            const formData = new FormData();
            formData.append('club_name', entry.club_name);
            formData.append('position', entry.student_position);
            formData.append('institute_name', entry.location);
            formData.append('year', entry.year);



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
            fetchCocurriculum(); // Refresh the list after adding/updating
        } catch (error) {
            console.error('Error saving certificate:', error);
            setError(error.message || 'Failed to save certificate. Please try again.');
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

            if (!itemToDelete || !itemToDelete.id) {
                throw new Error('No item selected for deletion');
            }

            const url = `${import.meta.env.VITE_BASE_URL}api/student/disableCocurriculum?id=${itemToDelete.id}`;
            const requestBody = {
                id: itemToDelete.id,
            };

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
            fetchCocurriculum(); // Refresh the list after deleting
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

            {Array.isArray(filteredData) && filteredData.length > 0 ? (
            <table className="w-100 ">
                <thead>
                    <tr>
                        <th className="border-bottom p-2">Club</th>
                        <th className="border-bottom p-2">Position</th>
                        <th className="border-bottom p-2">Year</th>
                        <th className="border-bottom p-2 text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {filteredData.map((item) => (
                            <tr key={item.id || item.club_name}>
                                    <td className="border-bottom p-4">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <div className="file-title">{item.club_name}</div>
                                                <div className="file-date">{item.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-bottom p-2">{item.student_position}</td>
                                    <td className="border-bottom p-2">{item.year}</td>
                                    <td className="border-bottom p-2">
                                        <div className="d-flex justify-content-end align-items-center">
                                            <Trash2 className="iconat-trash" onClick={() => openDeletePopup(item)} />
                                            <Edit2 className="iconat" onClick={() => editEntry(item)} />
                                            <Eye className="iconat" onClick={() => viewEntry(item)} />
                                        </div>
                                    </td>
                                </tr>         
                ))}
                </tbody>
            </table>

        ) : (
            <div>No other certificate or documentation found</div>
        )}
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
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
                    &gt;
                </button>
            </div>
            <WidgetClub
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

export default CoCurriculum;