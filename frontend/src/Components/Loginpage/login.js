import { Component } from "react"
import './login.css'
import Navbar from '../Navbar/navbar'
import CreateUser from '../CreateUser/createuser'

class Login extends Component{
    state = {
        showLogin: true
    };

    toggleForm = () =>{
        this.setState({showLogin: !this.state.showLogin});
    }

    render(){

        return(
            <div>
                <Navbar />

                {this.state.showLogin ? (
                <div className="login-container">
                    <div className="bg-login">
                        <label  className="form-text" for="username">Username</label>
                        <input className="input" id="username" type="text"/>
                        <label className="form-text" for="password">Password</label>
                        <input className="input" id="password" type="text"/>
                        <div className="button-div">
                            <button className="button">Login</button>
                            <button className="button" onClick={this.toggleForm}>Create new user</button>
                        </div>
                    </div>
                </div>
                ):
                (<CreateUser toggleForm={this.toggleForm}/>)}
            </div>
        )
    }
}


export default Login
