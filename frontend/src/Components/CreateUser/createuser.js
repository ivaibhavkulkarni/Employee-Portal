import { Component } from "react";
import './createuser.css';

class CreateUser extends Component {
    state = {
        username: '',
        password: '',
        repassword: '',
        errorMessage: '', // Define error message
        successMessage: '' // Define success message
    };

    handleCreateUser = async () => {
        const { username, password, repassword } = this.state;

        if (password !== repassword) {
            this.setState({ errorMessage: 'Passwords do not match.' });
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/userRoutes/createUser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.setState({ successMessage: data.message, errorMessage: '' });
            } else {
                this.setState({ errorMessage: data.error, successMessage: '' });
            }
        } catch (error) {
            this.setState({ errorMessage: 'An error occurred. Please try again.', successMessage: '' });
        }
    };

    render() {
        return (
            <div className="bg-container">
                <div className="bga-login">
                    <label className="form-text" htmlFor="username">Username</label>
                    <input className="input" id="username" type="text" onChange={(e) => this.setState({ username: e.target.value })} />

                    <label className="form-text" htmlFor="password">Password</label>
                    <input className="input" id="password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />

                    <label className="form-text" htmlFor="repassword">Re-enter Password</label>
                    <input className="input" id="repassword" type="password" onChange={(e) => this.setState({ repassword: e.target.value })} />

                    <div className="button-div">
                        <button className="button" onClick={this.handleCreateUser}>Create User</button>
                        <button className="button" onClick={this.props.toggleForm}>Login</button>
                    </div>

                    {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}
                    {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
                </div>
            </div>
        );
    }
}

export default CreateUser;
