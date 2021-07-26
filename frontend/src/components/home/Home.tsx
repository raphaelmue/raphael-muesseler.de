import React                                                   from 'react';
import {Container, Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import 'argon-design-system-react/src/assets/vendor/nucleo/css/nucleo.css';
import 'argon-design-system-react/src/assets/vendor/font-awesome/css/font-awesome.min.css';
import 'argon-design-system-react/src/assets/css/argon-design-system-react.css';

interface HomeComponentProps {
}

interface HomeComponentState {
}

class Home extends React.Component<HomeComponentProps, HomeComponentState> {

    render() {
        return (
            <Navbar
                className="navbar-horizontal navbar-dark bg-default"
                expand="lg">
                <Container>
                    <NavbarBrand onClick={e => e.preventDefault()}>
                        Raphael Müßeler
                    </NavbarBrand>
                    <Nav>
                        <NavItem>
                            <NavLink
                                className="nav-link-icon"
                                href="#pablo"
                                onClick={e => e.preventDefault()}>
                                <span className="nav-link-inner--text d-lg-none">
                                    Discover
                                </span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        );
    }

}

export default Home;
