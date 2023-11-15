import React from 'react';
import {
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar as NavBarReact,
    NavbarBrand,
    NavItem,
    UncontrolledDropdown
} from 'reactstrap';
import Headroom from 'headroom.js';
import {I18NLocale, MasterData} from '../../../../.openapi';
import ApiFactory from '../../../../api/ApiFactory';
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";

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
                <NavBarReact expand="lg">
                    <Container>
                        <NavbarBrand
                            href={"/"}>
                            {this.props.masterData.navbar.title}
                        </NavbarBrand>
                        <Collapse
                            isOpen={true}
                            navbar>
                            <Nav className="navbar-nav-hover ms-auto" navbar>
                                {this.props.masterData.navbar.items?.map(navItem => (
                                    <NavItem key={'navItem_' + navItem.id}>
                                        <Link to={navItem.url || '/'} className={"nav-link"}>{navItem.title}</Link>
                                    </NavItem>
                                ))}
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <i className="fa fa-globe"/>
                                    </DropdownToggle>
                                    <DropdownMenu>
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
                        </Collapse>
                    </Container>
                </NavBarReact>
            </header>
        );
    }
}

export default Navbar;
