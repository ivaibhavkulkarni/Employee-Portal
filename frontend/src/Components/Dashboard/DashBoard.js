import { Component } from 'react';
import './DashBoard.css';
import DashboradNav from '../DashboradNavbar/dashboardnav';
import Table from '../Table/table';
import AddEmployeeForm from '../AddEmployee/addEmployee';
import EditEmployeeForm from '../Edituser/edituser';

class Dashboard extends Component {
    state = {
        employees: [
            {
                id: 1,
                picture: 'https://th.bing.com/th/id/OIP.Nji0tUhiIonyCNLRaHA6qAHaHa?rs=1&pid=ImgDetMain',
                name: 'John Doe',
                email: 'john.doe@example.com',
                mobile: '1234567890',
                designation: 'Software Engineer',
                gender: 'Male',
                course: 'Computer Science',
                addDate: '2024-09-29',
            },
            // Add more employee objects if needed
        ],
        activitySection: 'welcome',
        isEditing: false,
        editingEmployeeId: null,
    };

    handleEdit = (id) => {
        this.setState({
            isEditing: true,
            editingEmployeeId: id,
            activitySection: 'editEmployee',
        });
    };

    handleDelete = (id) => {
        this.setState((prevState) => ({
            employees: prevState.employees.filter(employee => employee.id !== id),
        }));
    };

    handleNavClicks = (section) => {
        this.setState({
            activitySection: section,
            isEditing: false,
            editingEmployeeId: null,
        });
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
                        <h1 className='Welcomeheading'>Welcome {username}</h1> // Display the username
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
