import { Component } from 'react';
import './addEmployee.css';
import axios from 'axios';

class AddEmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: '',
            designation: '',
            gender: '',
            course: 'Computer Science',
            picture: null,
            addDate: new Date().toISOString().slice(0, 10)
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value, type, files } = event.target;
        this.setState({
            [name]: type === 'file' ? files[0] : value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        for (const key in this.state) {
            formData.append(key, this.state[key]);
        }

        // Retrieve token from localStorage (or your preferred storage location)
        const token = localStorage.getItem('token'); // Ensure token is available

        axios.post('http://localhost:5000/api/employeeRoutes/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,  // Include token for authorization
            }
        })
        .then(response => {
            alert('Employee added successfully!');
            this.setState({
                name: '',
                email: '',
                mobile: '',
                designation: '',
                gender: '',
                course: 'Computer Science',
                picture: null,
            });
        })
        .catch(error => {
            console.error("There was an error adding the employee:", error);
            alert('Error adding employee. Please try again.');
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <input type='text' name='name' value={this.state.name} onChange={this.handleChange} required />

                <label>Email:</label>
                <input type='email' name='email' value={this.state.email} onChange={this.handleChange} required />

                <label>Mobile:</label>
                <input type='text' name='mobile' value={this.state.mobile} onChange={this.handleChange} required />

                <label>Designation:</label>
                <input type='text' name='designation' value={this.state.designation} onChange={this.handleChange} required />

                <label>Gender:</label>
                <div className="gender-container">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={this.state.gender === 'Male'}
                            onChange={this.handleChange}
                            required
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={this.state.gender === 'Female'}
                            onChange={this.handleChange}
                            required
                        />
                        Female
                    </label>
                </div>

                <label>Course:</label>
                <select name="course" value={this.state.course} onChange={this.handleChange} required>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                </select>

                <label>Picture:</label>
                <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={this.handleChange}
                    required
                />

                <label>Add Date:</label>
                <input type="date" name="addDate" value={this.state.addDate} readOnly required />

                <button type="submit" className='submit-button'>Add Employee</button>
            </form>
        );
    }
}

export default AddEmployeeForm;
