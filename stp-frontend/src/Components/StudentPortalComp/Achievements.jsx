import React, { useState } from 'react';
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
    const [data, setData] = useState([
        { id: 1, events: 'ASC 2021', university: 'UCSI University', titleObtained: 'Champion', dateOfAchievement: '01/02/2021', uploads: 'certificate.pdf' },
        { id: 2, events: 'National Robotics Championship 2020', university: 'University of Malaya', titleObtained: 'First Runner-Up', dateOfAchievement: '12/08/2020', uploads: 'certificate2.pdf' },
        { id: 3, events: 'Engineering Innovation Award 2022', university: 'Universiti Teknologi Malaysia', titleObtained: 'Winner', dateOfAchievement: '18/03/2022', uploads: 'certificate3.pdf' },
        { id: 5, events: 'ASEAN Data Science Challenge 2020', university: 'Sunway University', titleObtained: 'Champion', dateOfAchievement: '14/09/2020', uploads: 'certificate5.pdf' },
        { id: 6, events: 'International Software Design Competition 2021', university: 'Monash University Malaysia', titleObtained: 'Second Runner-Up', dateOfAchievement: '03/11/2021', uploads: 'certificate6.pdf' },
        { id: 7, events: 'Mathematics Olympiad 2019', university: 'HELP University', titleObtained: 'Bronze Medalist', dateOfAchievement: '20/06/2019', uploads: 'certificate7.pdf' },
        { id: 8, events: 'Cybersecurity Challenge 2022', university: 'Universiti Sains Malaysia', titleObtained: 'Winner', dateOfAchievement: '10/10/2022', uploads: 'certificate8.pdf' },
        { id: 9, events: 'Green Energy Innovation Contest 2021', university: 'INTI International University', titleObtained: 'Champion', dateOfAchievement: '05/04/2021', uploads: 'certificate9.pdf' },
        { id: 10, events: 'Young Entrepreneurs Forum 2023', university: 'UCSI University', titleObtained: 'Best Pitch Award', dateOfAchievement: '12/07/2023', uploads: 'certificate10.pdf' },
        { id: 11, events: 'International Robotics Championship 2022', university: 'Universiti Kebangsaan Malaysia', titleObtained: 'First Runner-Up', dateOfAchievement: '30/08/2022', uploads: 'certificate11.pdf' },
        { id: 12, events: 'National Science Fair 2020', university: 'Universiti Putra Malaysia', titleObtained: 'Champion', dateOfAchievement: '23/09/2020', uploads: 'certificate12.pdf' },
        { id: 13, events: 'ASEAN Robotics Challenge 2023', university: 'Universiti Teknologi PETRONAS', titleObtained: 'Second Runner-Up', dateOfAchievement: '15/02/2023', uploads: 'certificate13.pdf' },
    ]);

    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.events.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.titleObtained.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dateOfAchievement.includes(searchTerm)
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
                        <th className="border-bottom p-2">Events</th>
                        <th className="border-bottom p-2">Title Obtained</th>
                        <th className="border-bottom p-2">Date of Achievement</th>
                        <th className="border-bottom p-2">Uploads</th>
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
                                                <div className="file-title">{item.events}</div>
                                                <div className="file-date">{item.university}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-bottom p-2 text-end file-date">{item.titleObtained}</td>
                                    <td className="border-bottom p-2 text-end">{item.dateOfAchievement}</td>
                                    <td className="border-bottom p-2 text-end file-date">{item.uploads}</td>
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