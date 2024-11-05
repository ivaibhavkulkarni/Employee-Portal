import { Component } from 'react';
import axios from 'axios';
import './edituser.css';

class EditEmployeeForm extends Component {
    constructor(props) {
        super(props);
        const { employee } = props;

        this.state = {
            name: employee ? employee.name : '',
            email: employee ? employee.email : '',
            mobile: employee ? employee.mobile : '',
            designation: employee ? employee.designation : '',
            gender: employee ? employee.gender : '',
            course: employee ? employee.course : 'Computer Science',
            picture: employee ? employee.picture : null,
            addDate: employee ? employee.addDate : new Date().toISOString().slice(0, 10)
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

    async handleSubmit(event) {
        event.preventDefault();
        const { name, email, mobile, designation, gender, course } = this.state;
        const { employee } = this.props;
        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('course', course);

        if (this.state.picture && this.state.picture !== employee.picture) {
            formData.append('picture', this.state.picture);
        }

        try {
            // Retrieve the token from local storage or context
            const token = localStorage.getItem('token'); // Adjust this according to your auth implementation

            await axios.put(`http://localhost:5000/api/employeeRoutes/edit/${employee._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // Include the token here
                },
            });
            alert("Employee updated successfully!");

            // Call the onUpdate callback to refresh employee list and switch back to list view
            if (this.props.onUpdate) {
                this.props.onUpdate();
            }
        } catch (error) {
            console.error("Error updating employee:", error);
            if (error.response) {
                alert(`Failed to update employee: ${error.response.data.message || 'Unauthorized'}`);
            } else {
                alert("Failed to update employee. Please try again.");
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <input
                    type='text'
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                />

                <label>Email:</label>
                <input
                    type='email'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                />

                <label>Mobile:</label>
                <input
                    type='text'
                    name='mobile'
                    value={this.state.mobile}
                    onChange={this.handleChange}
                    required
                />

                <label>Designation:</label>
                <input
                    type='text'
                    name='designation'
                    value={this.state.designation}
                    onChange={this.handleChange}
                    required
                />

                <label>Gender:</label>
                <div className="gender-container">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={this.state.gender === 'Male'}
                            onChange={this.handleChange}
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
                        />
                        Female
                    </label>
                </div>

                <label>Course:</label>
                <select
                    name="course"
                    value={this.state.course}
                    onChange={this.handleChange}
                    required
                >
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
                />

                <button type="submit" className='submit-button'>Update Employee</button>
            </form>
        );
    }
}

export default EditEmployeeForm;
