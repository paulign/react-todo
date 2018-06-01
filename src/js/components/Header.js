import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">

                    <NavLink className="navbar-brand" exact to="/">React Todo</NavLink>

                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto ml-3" navbar>
                            <NavItem>
                                <NavLink exact activeClassName={"active"} className="nav-link" to="/">Todolist</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink activeClassName={"active"} className="nav-link" to="/add">Add todo</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header;