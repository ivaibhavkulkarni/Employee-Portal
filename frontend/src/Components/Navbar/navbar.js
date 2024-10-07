import { Component } from 'react'
import './navbar.css'
import applelogo from './apple-logo.png'


class Navbar extends Component{
    render(){
        return(
            <nav className="nav-bar">
                <div className="nav">
                    <img className="img" src={applelogo}/>
                    <p className="apple-text">Welcome to Apple Employee</p>
                </div>
            </nav>
        )
    }
}

export default Navbar
