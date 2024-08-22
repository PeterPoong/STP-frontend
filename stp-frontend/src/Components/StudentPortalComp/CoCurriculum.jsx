import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Edit2, Trash2, Eye, Plus, Search } from 'lucide-react';
import WidgetClub from "../../Components/StudentPortalComp/WidgetClub";
import WidgetPopUpDelete from "../../Components/StudentPortalComp/WidgetPopUpDelete";
import "../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";

const CoCurriculum = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [data, setData] = useState([
        { id: 1, club: 'LEO Club', university: 'UCSI University', position: 'President', year: 2024 },
        { id: 2, club: 'Art Club', university: 'UCSI University', position: 'Secretary', year: 2024 },
        // ... other initial data ...
    ]);

    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.year.toString().includes(searchTerm)
    );

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
    const saveEntry = (entry) => {
        if (entry.id) {
            // Update existing entry
            setData(data.map(item => item.id === entry.id ? entry : item));
        } else {
            // Add new entry
            const newEntry = { ...entry, id: Date.now() };
            setData([...data, newEntry]);
        }
        setIsPopupOpen(false);
        setCurrentItem(null);
    };

    // Function to open delete popup
    const openDeletePopup = (item) => {
        setItemToDelete(item);
        setIsDeletePopupOpen(true);
    };

    // Function to delete entry
    const deleteEntry = () => {
        setData(data.filter(item => item.id !== itemToDelete.id));
        setIsDeletePopupOpen(false);
        setItemToDelete(null);
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
                    <TransitionGroup component={null}>
                        {currentItems.map((item) => (
                            <CSSTransition
                                key={item.id}
                                timeout={700}
                                classNames="row"
                            >
                                <tr>
                                    <td className="border-bottom p-4">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <div className="file-title">{item.club}</div>
                                                <div className="file-date">{item.university}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-bottom p-2">{item.position}</td>
                                    <td className="border-bottom p-2">{item.year}</td>
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