import React          from 'react';
import {
    Col,
    Container,
    Nav,
    Navbar as NavBarReact,
    NavbarBrand,
    NavItem,
    NavLink,
    Row,
    UncontrolledCollapse
}                     from 'reactstrap';
import {Link}         from 'react-router-dom';
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
                    className="navbar-horizontal"
                    expand="lg">
                    <Container>
                        <NavbarBrand onClick={e => e.preventDefault()}>
                            {this.props.navbarData.title}
                        </NavbarBrand>
                        <button
                            aria-controls="navbar-default"
                            aria-expanded={false}
                            aria-label="Toggle navigation"
                            className="navbar-toggler"
                            data-target="#navbar-default"
                            data-toggle="collapse"
                            id="navbar-default"
                            type="button">
                            <i className={"fa fa-bars"}/>
                        </button>
                        <UncontrolledCollapse
                            toggler="#navbar-default"
                            navbar>
                            <div className="navbar-collapse-header">
                                <Row>
                                    <Col className="collapse-brand" xs="6">
                                        <Link to="/">

                                        </Link>
                                    </Col>
                                    <Col className="collapse-close" xs="6">
                                        <button
                                            aria-controls="navbar-default"
                                            aria-expanded={false}
                                            aria-label="Toggle navigation"
                                            className="navbar-toggler"
                                            data-target="#navbar-default"
                                            data-toggle="collapse"
                                            id="navbar-default"
                                            type="button">
                                            <span/>
                                            <span/>
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                            <Nav className="ml-lg-auto" navbar>
                                {this.props.navbarData.items.map(navItem => (
                                    <NavItem>
                                        <Link to={navItem.url}><NavLink>{navItem.title}</NavLink></Link>
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
