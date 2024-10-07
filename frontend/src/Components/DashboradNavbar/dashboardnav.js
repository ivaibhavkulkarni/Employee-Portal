import './dashnav.css'
import applelogo from './apple-logo.png'
import { Component } from 'react'

class DashboradNav extends Component{
    render(){

        const { onNavClick } = this.props;
        return(
            <nav className="nav-bar-dash">
                <div className="nav">
                    <img className="img" src={applelogo} onClick={()=> onNavClick('welcome')}/>
                    <button className='Dbutton' onClick={()=> onNavClick('employeeList')}>Employee List</button>
                    <button className='Dbutton' onClick={()=> onNavClick('addEmployee')}>Add User</button>
                </div>
                <div className='nav-2'>
                    <button className='logbutton'>Log out</button>
                </div>
            </nav>
        )
    }
}


export default DashboradNav