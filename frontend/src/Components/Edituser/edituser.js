import { Component } from 'react';
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

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state); 
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

                <label>Add Date:</label>
                <input
                    type="date"
                    name="addDate"
                    value={this.state.addDate}
                    readOnly
                    required
                />

                <button type="submit" className='submit-button'>Update Employee</button>
            </form>
        );
    }
}

export default EditEmployeeForm;
