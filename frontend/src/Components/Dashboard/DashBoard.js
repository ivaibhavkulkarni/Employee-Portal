import { Component } from 'react'; 
import './DashBoard.css';
import DashboradNav from '../DashboradNavbar/dashboardnav';
import Table from '../Table/table';
import AddEmployeeForm from '../AddEmployee/addEmployee';
import EditEmployeeForm from '../Edituser/edituser';
import axios from 'axios';

class Dashboard extends Component {
    state = {
        employees: [],
        activitySection: 'welcome',
        isEditing: false,
        editingEmployeeId: null,
    };

    componentDidMount() {
        this.fetchEmployees();
    }

    fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token'); // Get the token from local storage
            const response = await axios.get('http://localhost:5000/api/employeeRoutes/get', {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the headers
                }
            });
            this.setState({ employees: response.data });
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    handleEdit = (_id) => {
        this.setState({
            isEditing: true,
            editingEmployeeId: _id,
            activitySection: 'editEmployee',
        });
    };

    handleDelete = async (_id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/employeeRoutes/delete/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token for delete request
                }
            });
            this.fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    handleNavClicks = (section) => {
        this.setState({
            activitySection: section,
            isEditing: false,
            editingEmployeeId: null,
        });

        if (section === 'employeeList') {
            this.fetchEmployees();
        }
    };

    getEditingEmployee = () => {
        return this.state.employees.find(emp => emp._id === this.state.editingEmployeeId);
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
