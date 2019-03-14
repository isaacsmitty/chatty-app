import React, {Component} from 'react';


class NavBar extends Component {
    constructor(props) {
        super(props)

        console.log('NavBar props:', props)  
    }

    

    render() { 
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <span className="navbar-usercount">Users: { this.props.userCount }</span>
            </nav>
        );
      }
    }

export default NavBar;
