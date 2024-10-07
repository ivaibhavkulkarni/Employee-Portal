import { Component } from 'react'
import './DashBoard.css'
import DashboradNav from '../DashboradNavbar/dashboardnav'
import Table from '../Table/table'
import AddEmployeeForm from '../AddEmployee/addEmployee'
import EditEmployeeForm from '../Edituser/edituser'

class Dashboard extends Component{
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
            ],
            activitySection: 'welcome',
            isEditing: false,
            editingEmployeeId: null,
        };
    
        handleEdit = (id) => {
            this.setState((prevState) => ({ isEditing: !prevState.isEditing,editingEmployeeId: id,}));
            console.log(`Edit employee with ID: ${id}`);
        };
    
        handleDelete = (id) => {
            console.log(`Delete employee with ID: ${id}`);
        };
    

        handleNavClicks = (section) =>{
            this.setState({activitySection:section,
                isEditing: false,
                editingEmployeeId: null
            })
            
        };
        

    render(){

        const {employees, activitySection, isEditing,editingEmployeeId} = this.state;
        return(
            <div>
                <DashboradNav onNavClick={this.handleNavClicks}/>
                <div className='dash-container'>

                    {isEditing && <EditEmployeeForm employeeId={editingEmployeeId} />}

                    {!isEditing && activitySection === 'welcome' && <h1 className='Welcomeheading'>Welcome Username</h1>}
                    
                    {!isEditing && activitySection === 'employeeList' && (
                    <Table
                        employees={this.state.employees}
                        onEdit={this.handleEdit}
                        onDelete={this.handleDelete}
                    />
                    )}

                    {!isEditing && activitySection === 'addEmployee' && <AddEmployeeForm/>}

                    
                </div>
            </div>
        )
    }
}

export default Dashboard
