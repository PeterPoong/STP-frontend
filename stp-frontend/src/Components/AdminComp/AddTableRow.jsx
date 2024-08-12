import React from 'react';
import '../../css/AdminStyles/AddNew.css';
import { Row, Col, Form, Button, Dropdown } from 'react-bootstrap';

const AddTableRow = () => {
  return (
    <div className="add-table-row">
        <Row className="align-items-center mb-3">
            <Col xs={12} md={8} className="d-flex">
                <Form.Group controlId="entriesDropdown" className="mr-2">
                <Form.Label className="mr-2">Show entries</Form.Label>
                <Form.Control className='FilterDropDown' as="select">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                </Form.Control>
                </Form.Group>

                <Form.Group controlId="searchBar" className="flex-grow-1">
                <Form.Label className="sr-only">Search</Form.Label>
                <Form.Control className='SearchBar' type="text" placeholder="Search" />
                </Form.Group>
            </Col>

            <Col xs={12} md={4} className="text-md-right text-center mt-2 mt-md-0">
                <Button className='AddBtn' variant="primary">+ Add New</Button>
            </Col>
        </Row>
    </div>
    
  );
};

export default AddTableRow;
