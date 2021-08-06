import React                                                                                        from 'react';
import {Container, Nav, Navbar as NavBarReact, NavbarBrand, NavItem, NavLink, UncontrolledCollapse} from 'reactstrap';
import {Link}                                                                                       from 'react-router-dom';
import Headroom                                                                                     from 'headroom.js';

interface NavbarComponentProps {
}

interface NavbarComponentState {
}

class Navbar extends React.Component<NavbarComponentProps, NavbarComponentState> {
    componentDidMount() {
        const header = document.getElementById('header');
        // @ts-ignore
        const headroom = new Headroom(header);
        headroom.init();
    }

    render() {
        return (
            <header id={'header'} className={'headroom'}>
                <NavBarReact
                    fixed={'top'}
                    className="navbar-horizontal"
                    expand="lg">
                    <Container>
                        <NavbarBrand onClick={e => e.preventDefault()}>
                            Raphael Müßeler
                        </NavbarBrand>
                        <button
                            aria-controls="navbar-primary"
                            aria-expanded={false}
                            aria-label="Toggle navigation"
                            className="navbar-toggler"
                            data-target="#navbar-primary"
                            data-toggle="collapse"
                            id="navbar-primary"
                            type="button">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <UncontrolledCollapse toggler="#navbar-primary" navbar>
                            <Nav className="ml-lg-auto" navbar>
                                <NavItem>
                                    <Link to={''}><NavLink href={''}>About Me</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to={''}><NavLink href={''}>Projects</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to={''}><NavLink href={''}>Contact Me</NavLink></Link>
                                </NavItem>
                            </Nav>
                        </UncontrolledCollapse>
                    </Container>
                </NavBarReact>
            </header>
        );
    }
}

export default Navbar;
