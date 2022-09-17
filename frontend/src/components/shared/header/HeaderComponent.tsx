import React                                                   from 'react';
import Navbar                                                  from './navbar/Navbar';
import Banner                                                  from './banner/Banner';
import {MasterDataResponseDataObject, SectionsHeaderComponent} from '../../../.openapi';

interface HeaderComponentProps {
    masterData: MasterDataResponseDataObject
    headerData: SectionsHeaderComponent;
}

interface HeaderComponentState {
}

class HeaderComponent extends React.Component<HeaderComponentProps, HeaderComponentState> {
    render() {
        return (
            <header>
                <Navbar masterData={this.props.masterData}/>
                <Banner headerData={this.props.headerData}/>
            </header>
        );
    }
}

export default HeaderComponent;
