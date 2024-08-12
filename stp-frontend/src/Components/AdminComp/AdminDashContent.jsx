import React from 'react';
import { Card, CardBody, CardTitle, Container } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../../css/AdminStyles/DashContent.css'

const AdminDashContent =()=>{

    // Dummy data to mimic a bell curve
  const data = [
    { month: 'JAN', Applicants: 20 },
    { month: 'FEB', Applicants: 30 },
    { month: 'MAR', Applicants: 50 },
    { month: 'APR', Applicants: 70 },
    { month: 'MAY', Applicants: 100 },
    { month: 'JUN', Applicants: 120 },
    { month: 'JUL', Applicants: 100 },
    { month: 'AUG', Applicants: 70 },
    { month: 'SEP', Applicants: 50 },
    { month: 'OCT', Applicants: 30 },
    { month: 'NOV', Applicants: 20 },
    { month: 'DEC', Applicants: 10 },
  ];

    return(
        <Container fluid>
            <div className='CardsContainer'>
            <Card className='InfoCard' style={{width: "12rem", marginTop: '2.5%',height:'6rem'}}>
                  <Card.Body>
                      <span>Students: </span>
                      <span>500</span>
                  </Card.Body>
              </Card>

              <Card className='InfoCard' style={{width: "12rem", marginTop: '2.5%'}}>
                  <Card.Body>
                      <span>Schools: </span>
                      <span>500</span>
                  </Card.Body>
              </Card>

              <Card className='InfoCard' style={{width: "12rem", marginTop: '2.5%'}}>
                  <Card.Body>
                      <span>Admin: </span>
                      <span>500</span>
                  </Card.Body>
              </Card>

              <Card className='InfoCard' style={{width: "12rem", marginTop: '2.5%'}}>
                  <Card.Body>
                      <span>Courses: </span>
                      <span>500</span>
                  </Card.Body>
              </Card>
            </div>

            <div className='BarChartContainer'>
                <Card>
                    <CardBody className='ChartCard'>
                        <CardTitle>Applicants</CardTitle>
                        <BarChart
                            width={1200}
                            height={400}
                            data={data}
                            margin={{
                                top: 20, right: 30, left: 20, bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Applicants" fill="#8884d8" />
                        </BarChart>
                    </CardBody>
                </Card>
            </div>
        </Container>
    );
};

export default AdminDashContent;