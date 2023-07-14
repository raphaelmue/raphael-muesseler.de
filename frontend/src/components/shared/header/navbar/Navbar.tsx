import React from 'react';
import {
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    Nav,
    Navbar as NavBarReact,
    NavbarBrand,
    NavItem,
    NavLink,
    Row,
    UncontrolledCollapse,
    UncontrolledDropdown
} from 'reactstrap';
import {Link} from 'react-router-dom';
import Headroom from 'headroom.js';
import {I18NLocale, MasterData} from '../../../../.openapi';
import ApiFactory from '../../../../api/ApiFactory';
import Cookies from 'universal-cookie';

interface NavbarComponentProps {
    masterData: MasterData
}

interface NavbarComponentState {
    locales: I18NLocale[];
}

class Navbar extends React.Component<NavbarComponentProps, NavbarComponentState> {
    constructor(props: NavbarComponentProps) {
        super(props);

        this.state = {
            locales: []
        };
    }

    componentDidMount(): void {
        ApiFactory.getInstance().getLocaleApi().getI18nLocales().then(locales => {
            this.setState({locales: locales.data});
        });

        const header = document.getElementById('header');
        if (header) {
            const headroom = new Headroom(header);
            headroom.init();
        }
    }

    onChangeLanguage(code: string): void {
        const cookies = new Cookies();
        cookies.set('locale', code, {path: '/'});

        window.location.reload();
    }

    render() {
        return (
            <header id={'header'} className={'headroom'}>
                <NavBarReact
                    className="navbar-horizontal"
                    expand="lg">
                    <Container>
                        <NavbarBrand onClick={e => e.preventDefault()}>
                            <Link to={'/'}><NavLink>{this.props.masterData.navbar.title}</NavLink></Link>
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
                            <i className={'fa fa-bars'}/>
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
                            <Nav className="navbar-nav-hover ml-lg-auto" navbar>
                                {this.props.masterData.navbar.items?.map(navItem => (
                                    <NavItem key={'navItem_' + navItem.id}>
                                        <Link to={navItem.url || '/'}><NavLink>{navItem.title}</NavLink></Link>
                                    </NavItem>
                                ))}
                                <UncontrolledDropdown nav>
                                    <NavLink
                                        aria-expanded={false}
                                        aria-haspopup={true}
                                        className="nav-link-icon"
                                        data-toggle="dropdown"
                                        href="#pablo"
                                        id="navbar-language-dropdown"
                                        onClick={e => e.preventDefault()}
                                        role="button">
                                        <i className="fa fa-globe"/>
                                        <span className="nav-link-inner--text d-lg-none">Language</span>
                                    </NavLink>
                                    <DropdownMenu
                                        aria-labelledby="navbar-language-dropdown"
                                        right>
                                        {this.state.locales.map(locale => (
                                            <DropdownItem
                                                key={'languageDropdown_' + locale.name}
                                                onClick={() => this.onChangeLanguage(locale.code!)}>
                                                <i className={'flag-icon flag-icon-' + locale.code?.replace('en', 'us')}/>
                                                {locale.name?.replace(/(\(.*\))/g, '')}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </UncontrolledCollapse>
                    </Container>
                </NavBarReact>
            </header>
        );
    }
}

export default Navbar;
