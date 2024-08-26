import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Trash2, Eye, Plus, Search, FileText } from 'lucide-react';
import WidgetFileUpload from "../../Components/StudentPortalComp/WidgetFileUpload";
import WidgetPopUpDelete from "../../Components/StudentPortalComp/WidgetPopUpDelete";
import "../../css/StudentPortalStyles/StudentPortalAcademicTranscript.css";

const OtherCertDoc = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [data, setData] = useState([
        { id: 1, title: 'Certificate 1', filename: 'cert1.pdf', date: '2023-08-22' },
        { id: 2, title: 'Document 2', filename: 'doc2.pdf', date: '2023-08-23' },
        // ... other initial data ...
    ]);

    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.filename.toLowerCase().includes(searchTerm.toLowerCase())
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

    // Function to add new file
    const addFile = (newFile) => {
        const fileEntry = {
            id: Date.now(),
            title: newFile.title,
            filename: newFile.filename,
            date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
            file: newFile.file // You might want to handle the actual file differently
        };
        setData([...data, fileEntry]);
        setIsFileUploadOpen(false);
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

    // Function to view file (placeholder)
    const viewFile = (item) => {
        console.log("Viewing file:", item);
        // Implement file viewing logic here
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
                    <button className="button-table w-25 px-5 ml-auto" onClick={() => setIsFileUploadOpen(true)}>
                        ADD NEW
                    </button>
                </div>
            </div>

            <table className="w-100 ">
                <thead>
                    <tr>
                        <th className="border-bottom p-2">Files</th>
                        <th className="border-bottom p-2 text-end">Filename</th>
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
                                            <FileText className="file-icon me-2" />
                                            <div>
                                                <div className="file-title">{item.title}</div>
                                                <div className="file-date">{item.date}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-bottom p-2 text-end">{item.filename}</td>
                                    <td className="border-bottom p-2">
                                        <div className="d-flex justify-content-end align-items-center">
                                            <Trash2 className="iconat-trash" onClick={() => openDeletePopup(item)} />
                                            <Eye className="iconat" onClick={() => viewFile(item)} />
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

            <WidgetFileUpload
                isOpen={isFileUploadOpen}
                onClose={() => setIsFileUploadOpen(false)}
                onSave={addFile}
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