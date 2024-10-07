import { Component } from "react";
import './createuser.css';

class CreateUser extends Component {
    render() {
        return (
                <div className="bg-container">
                    <div className="bga-login">
                            <label className="form-text" htmlFor="username">Username</label>
                            <input className="input" id="username" type="text" />

                            <label className="form-text" htmlFor="password">Password</label>
                            <input className="input" id="password" type="password" />

                            <label className="form-text" htmlFor="repassword">Re-enter Password</label>
                            <input className="input" id="repassword" type="password" />

                            <div className="button-div">
                                <button className="button">Create User</button>
                                <button className="button" onClick={this.props.toggleForm}>Login</button>
                            </div>
                    </div>
                </div>
        );
    }
}

export default CreateUser;
