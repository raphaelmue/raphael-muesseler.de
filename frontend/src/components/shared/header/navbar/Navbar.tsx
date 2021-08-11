import React                                                                                        from 'react';
import {Container, Nav, Navbar as NavBarReact, NavbarBrand, NavItem, NavLink, UncontrolledCollapse} from 'reactstrap';
import {Link}                                                                                       from 'react-router-dom';
import Headroom       from 'headroom.js';
import {HeaderNavbar} from '../../../../.openapi';

interface NavbarComponentProps {
    navbarData: HeaderNavbar;
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
                            {this.props.navbarData.title}
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
                                {this.props.navbarData.items?.map(navbar => (
                                    <NavItem>
                                        <Link to={''}><NavLink href={''}>{navbar.title}</NavLink></Link>
                                    </NavItem>
                                ))}
                            </Nav>
                        </UncontrolledCollapse>
                    </Container>
                </NavBarReact>
            </header>
        );
    }
}

export default Navbar;
