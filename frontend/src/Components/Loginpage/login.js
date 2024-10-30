import React, { Component } from "react";
import './login.css';
import Navbar from '../Navbar/navbar';
import { useNavigate } from 'react-router-dom';
import CreateUser from '../CreateUser/createuser';

class Login extends Component {
    state = {
        showLogin: true,
        username: '',
        password: '',
        errorMessage: ''
    };

    toggleForm = () => {
        this.setState({ showLogin: !this.state.showLogin });
    };

    handleLogin = async () => {
        const { username, password } = this.state;
        try {
            const response = await fetch("http://localhost:5000/api/userRoutes/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username); // Store the username
                this.setState({ errorMessage: '' });
                this.props.navigate('/dashboard');
            } else {
                this.setState({ errorMessage: data.error });
            }
        } catch (error) {
            this.setState({ errorMessage: 'An error occurred. Please try again.' });
        }
    };

    render() {
        return (
            <div>
                <Navbar />
                {this.state.showLogin ? (
                    <div className="login-container">
                        <div className="bg-login">
                            <label className="form-text" htmlFor="username">Username</label>
                            <input className="input" id="username" type="text" onChange={(e) => this.setState({ username: e.target.value })} />
                            <label className="form-text" htmlFor="password">Password</label>
                            <input className="input" id="password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                            <div className="button-div">
                                <button className="button" onClick={this.handleLogin}>Login</button>
                                <button className="button" onClick={this.toggleForm}>Create new user</button>
                            </div>
                            {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}
                        </div>
                    </div>
                ) : (
                    <CreateUser toggleForm={this.toggleForm} />
                )}
            </div>
        );
    }
}

export default function LoginWrapper() {
    const navigate = useNavigate();
    return <Login navigate={navigate} />;
}
