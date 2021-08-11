import React                         from 'react';
import {HeaderNavbar, LandingHeader} from '../../../.openapi';
import Navbar                        from './navbar/Navbar';
import Banner                        from './banner/Banner';

interface HeaderComponentProps {
    navbarData: HeaderNavbar;
    headerData: LandingHeader;
}

interface HeaderComponentState {
}

class HeaderComponent extends React.Component<HeaderComponentProps, HeaderComponentState> {
    render() {
        return (
            <header>
                <Navbar navbarData={this.props.navbarData}/>
                <Banner headerData={this.props.headerData}/>
            </header>
        );
    }
}

export default HeaderComponent;
