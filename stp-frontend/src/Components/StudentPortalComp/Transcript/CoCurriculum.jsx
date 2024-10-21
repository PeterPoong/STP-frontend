import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Edit2, Trash2, Eye, Plus, Search } from 'lucide-react';
import WidgetClub from "../../../Components/StudentPortalComp/Widget/WidgetClub";
import WidgetPopUpDelete from "../../../Components/StudentPortalComp/WidgetPopUpDelete";
import "../../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";
import "../../../css/StudentPortalStyles/StudentButtonGroup.css";
import Cocurriculum from "../../../assets/StudentPortalAssets/Cocurriculum.png"
import WidgetBackground from "../../../Components/StudentPortalComp/WidgetBackground";
import LoadingWidget1 from "../../../Components/StudentPortalComp/LoadingWidget1";

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
    const [isViewMode, setIsViewMode] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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

    useEffect(() => {
        // Reset to first page when search term changes
        setCurrentPage(1);
    }, [searchTerm]);


    const fetchCocurriculum = async () => {
        //console.log('Fetching co-curriculum data...');
        setIsLoading(true);
        setError(null);
        try {
            const token =
                sessionStorage.getItem("token") || localStorage.getItem("token");
            if (!token) {
                throw new Error('No authentication token found');
            }

            const apiUrl = `${import.meta.env.VITE_BASE_URL}api/student/co-curriculumList`;
            //console.log('Fetching from URL:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
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
            //console.log('Fetched data:', result);

            let coCurriculumArray = [];
            if (result.data && Array.isArray(result.data)) {
                coCurriculumArray = result.data.map(normalizeItem);
            } else if (result.data && result.data.data && Array.isArray(result.data.data)) {
                coCurriculumArray = result.data.data.map(normalizeItem);
            } else {
                console.warn('Unexpected data structure:', result);
            }

            //console.log('Normalized data:', coCurriculumArray);

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
        item?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.year?.toString().includes(searchTerm))
    ) : [];

    useEffect(() => {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPage > totalPages) {
            setCurrentPage(totalPages === 0 ? 1 : totalPages);
        }
    }, [filteredData, itemsPerPage, currentPage]);


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
            const token =
                sessionStorage.getItem("token") || localStorage.getItem("token");
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
            //console.log('Save/Edit response:', result);

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

            //console.log('Response status:', response.status);
            //console.log('Response headers:', response.headers);

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || `HTTP error! status: ${response.status}`);
                }
                //console.log('Delete response:', result);
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
        } finally {
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

    if (isLoading) return <div>
        <LoadingWidget1/>
    </div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="transcript-search-bar-padmar">
            <div className="transcript-search-bar-container  ">
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
            <div className="transcript-responsive-table-div">
                {Array.isArray(currentItems) && currentItems.length > 0 ? (
                    <table className="w-100 transcript-responsive-table">
                        <thead >
                            <tr>
                                <th className="border-bottom p-2 fw-normal">Club</th>
                                <th className="border-bottom p-2 fw-normal">Position</th>
                                <th className="border-bottom p-2 fw-normal">Year</th>
                                <th className="border-bottom p-2 text-end fw-normal">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TransitionGroup component={null}>
                                {currentItems.map((item) => (
                                    <CSSTransition key={item.id || item.club_name} timeout={300} classNames="fade">
                                        <tr>
                                            <td className="border-bottom py-2 px-2" data-label="Club">
                                                <div className="d-flex align-items-center">
                                                    <div className="transcript-responsive-table-text-end">
                                                        <div className="file-title mb-1 sac-name-restrict">{item.club_name}</div>
                                                        <div className="file-date sac-name-restrict">{item.location}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="border-bottom p-2 " data-label="Position">
                                                <div className="sac-name-restrict">
                                                    {item.student_position}
                                                </div>
                                            </td>
                                            <td className="border-bottom p-2" data-label="Year">
                                                <div >
                                                    {item.year}
                                                </div>
                                            </td>
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
                    <div style={{ height: '225px' }}>
                        <WidgetBackground>

                            <div style={{ padding: '20px' }} className="d-flex justify-content-center" >
                                <div className="d-flex flex-column justify-content-center ">
                                    <h1 className="testing-word-two">No cocurriculum has been found</h1>
                                    <p className="testing-word-two mb-0">Please upload any cocurriculum activites you have joined.</p>
                                </div>
                                <img src={Cocurriculum} className="ms-5 me-4" style={{ height: '100px', width: '100px' }} />

                            </div>
                        </WidgetBackground>
                    </div>
                )}
            </div>
            {pageNumbers.length > 1 && (
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
            )}
            <WidgetClub
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

export default CoCurriculum;