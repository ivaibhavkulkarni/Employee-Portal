import './dashnav.css';
import applelogo from './apple-logo.png';
import { Component } from 'react';
import { useNavigate } from 'react-router-dom';

class DashboardNav extends Component {
    handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Clear the username
        this.props.navigate('/');         
    };

    render() {
        const { onNavClick } = this.props;
        return (
            <nav className="nav-bar-dash">
                <div className="nav">
                    <img className="img" src={applelogo} onClick={() => onNavClick('welcome')} />
                    <button className='Dbutton' onClick={() => onNavClick('employeeList')}>Employee List</button>
                    <button className='Dbutton' onClick={() => onNavClick('addEmployee')}>Add User</button>
                </div>
                <div className='nav-2'>
                    <button className='logbutton' onClick={this.handleLogout}>Log out</button>
                </div>
            </nav>
        );
    }
}

export default function DashboardNavWrapper(props) {
    const navigate = useNavigate();
    return <DashboardNav {...props} navigate={navigate} />;
}
