import { Component } from 'react';
import './DashBoard.css';
import DashboradNav from '../DashboradNavbar/dashboardnav';
import Table from '../Table/table';
import AddEmployeeForm from '../AddEmployee/addEmployee';
import EditEmployeeForm from '../Edituser/edituser';
import axios from 'axios';

class Dashboard extends Component {
    state = {
        employees: [],  // Initially empty; will be populated by API data
        activitySection: 'welcome',
        isEditing: false,
        editingEmployeeId: null,
    };

    componentDidMount() {
        // Fetch employees data when the component mounts
        this.fetchEmployees();
    }

    fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employeeRoutes/get');
            this.setState({ employees: response.data });
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    handleEdit = (id) => {
        this.setState({
            isEditing: true,
            editingEmployeeId: id,
            activitySection: 'editEmployee',
        });
    };

    handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/employeeRoutes/delete/${id}`);
            this.fetchEmployees();  // Refresh the employees list after deletion
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    handleNavClicks = (section) => {
        // Update activity section and reset editing status
        this.setState({
            activitySection: section,
            isEditing: false,
            editingEmployeeId: null,
        });

        // Fetch employees if navigating to the employee list section
        if (section === 'employeeList') {
            this.fetchEmployees();
        }
    };

    getEditingEmployee = () => {
        return this.state.employees.find(emp => emp.id === this.state.editingEmployeeId);
    };

    render() {
        const { employees, activitySection, isEditing } = this.state;
        const editingEmployee = this.getEditingEmployee();

        // Retrieve the username from local storage
        const username = localStorage.getItem('username');

        return (
            <div>
                <DashboradNav onNavClick={this.handleNavClicks} />
                <div className='dash-container'>
                    {isEditing && editingEmployee && (
                        <EditEmployeeForm employee={editingEmployee} />
                    )}

                    {!isEditing && activitySection === 'welcome' && (
                        <h1 className='Welcomeheading'>Welcome {username}</h1>
                    )}

                    {!isEditing && activitySection === 'employeeList' && (
                        <Table
                            employees={employees}
                            onEdit={this.handleEdit}
                            onDelete={this.handleDelete}
                        />
                    )}

                    {!isEditing && activitySection === 'addEmployee' && <AddEmployeeForm />}
                </div>
            </div>
        );
    }
}

export default Dashboard;
