import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Button, Form, ListGroup } from 'react-bootstrap';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { FaCog, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import 'chart.js/auto';
import './admin.css';

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentChart, setCurrentChart] = useState('bar'); // State to keep track of the current chart

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme', !darkMode);
  };

  const projectData = {
    labels: ['Total Projects', 'Total Cohorts', 'Total Students', 'Total Collaborations'],
    datasets: [
      {
        label: 'Overview',
        data: [120, 15, 300, 45],
        backgroundColor: ['#6f42c1', '#563d7c', '#6c757d', '#343a40'],
        borderColor: ['#6f42c1', '#563d7c', '#6c757d', '#343a40'],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Total Projects',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: '#6f42c1',
        borderColor: '#6f42c1',
      },
      {
        label: 'Total Cohorts',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: '#563d7c',
        borderColor: '#563d7c',
      },
      {
        label: 'Total Students',
        data: [200, 150, 120, 140, 180, 170, 160],
        fill: false,
        backgroundColor: '#6c757d',
        borderColor: '#6c757d',
      },
    ],
  };

  return (
    <Container fluid className={darkMode ? 'dark-theme' : 'light-theme'}>
      <Row>
        <Col md={12}>
          <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" className="mb-3">
            <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Item className="ml-auto">
                <Nav.Link href="#"><FaCog size={20} /></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" onClick={toggleTheme}>
                  {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#"><FaUser size={20} /></Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col md={2} className={`bg-${darkMode ? 'dark-custom' : 'light-custom'} text-${darkMode ? 'white' : 'dark'} vh-200 p-3`}>
          <Nav className="flex-column">
            <Nav.Link href="#" className="nav-link-custom">Dashboard</Nav.Link>
            <Nav.Link href="#" className="nav-link-custom">Manage Projects</Nav.Link>
            <Nav.Link href="#" className="nav-link-custom">Manage Cohorts</Nav.Link>
            <Nav.Link href="#" className="nav-link-custom" onClick={() => setCurrentChart('bar')}>Bar Charts</Nav.Link>
            <Nav.Link href="#" className="nav-link-custom" onClick={() => setCurrentChart('pie')}>Pie Charts</Nav.Link>
            <Nav.Link href="#" className="nav-link-custom" onClick={() => setCurrentChart('line')}>Line Charts</Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          <Row className="mb-3">
            <Col>
              <h2 className="text-purple">Overview</h2>
              <Row>
                <Col sm={6} lg={6}>
                  <div className={`bg-${darkMode ? 'light-custom' : 'dark-custom'} p-3 rounded card`}>
                    <Bar data={projectData} />
                  </div>
                </Col>
                <Col sm={6} lg={6}>
                  <div className={`bg-${darkMode ? 'light-custom' : 'dark-custom'} p-3 rounded card`}>
                    <Pie data={projectData} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h2 className="text-purple">Add Cohort</h2>
              <Form inline>
                <Form.Group className="mb-2">
                  <Form.Label className="sr-only">Cohort Name</Form.Label>
                  <Form.Control type="text" placeholder="Cohort Name" />
                </Form.Group>
                <Button type="submit" className="btn-purple mb-2 ml-2">Add</Button>
              </Form>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h2 className="text-purple">Manage Projects</h2>
              <ListGroup>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Project 1
                  <Button variant="outline-danger">Delete</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Project 2
                  <Button variant="outline-danger">Delete</Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Project 3
                  <Button variant="outline-danger">Delete</Button>
                </ListGroup.Item>
              </ListGroup>
              <Button variant="outline-purple" className="mt-3">Add Project</Button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h2 className="text-purple">Line Charts</h2>
              {currentChart === 'bar' && (
                <div className={`bg-${darkMode ? 'light-custom' : 'dark-custom'} p-3 rounded card`}>
                  <Bar data={projectData} />
                </div>
              )}
              {currentChart === 'pie' && (
                <div className={`bg-${darkMode ? 'light-custom' : 'dark-custom'} p-3 rounded card`}>
                  <Pie data={projectData} />
                </div>
              )}
              {currentChart === 'line' && (
                <div className={`bg-${darkMode ? 'light-custom' : 'dark-custom'} p-3 rounded card`}>
                  <Line data={lineChartData} />
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="text-purple">Recent Activities</h2>
              <ListGroup>
                <ListGroup.Item className={`bg-${darkMode ? 'light-custom' : 'dark-custom'}`}>Added: Project A</ListGroup.Item>
                <ListGroup.Item className={`bg-${darkMode ? 'light-custom' : 'dark-custom'}`}>Deleted: Project B</ListGroup.Item>
                <ListGroup.Item className={`bg-${darkMode ? 'light-custom' : 'dark-custom'}`}>Added: Project C</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
