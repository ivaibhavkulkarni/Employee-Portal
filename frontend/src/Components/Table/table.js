import { Component } from 'react'
import './table.css'

class Table extends Component{
    render(){

        const { employees = [], onEdit, onDelete } = this.props;

        return(
            <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>Employee id</th>
                        <th>Picture</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Add Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee =>(
                        <tr key={employee.id}>
                            <td>{String(employee._id).slice(-3)}</td>
                            <td><img src={employee.picture} alt={`${employee.name}'s profile`} className='employee-img'/></td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.course}</td>
                            <td>{employee.addDate}</td>
                            <td>
                                <button className='dashboard-table-button' onClick={()=>onEdit(employee.id)}>Edit</button>
                                <button className='dashboard-table-button' onClick={()=>onDelete(employee.id)}>Delete</button>    
                            </td>        
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        )
    }
}

export default Table