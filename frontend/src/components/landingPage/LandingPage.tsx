import React                     from 'react';
import {Card, Col, Row, Spinner} from 'reactstrap';
import Content                   from '../shared/content/Content';
import CardLink                  from '../shared/card/cardLink/CardLink';
import {Header, Landing}         from '../../.openapi';
import HeaderComponent           from '../shared/header/HeaderComponent';
import ApiFactory                from '../../api/ApiFactory';
import FooterComponent           from '../shared/footer/FooterComponent';

interface HomeComponentProps {
}

interface HomeComponentState {
    landingPageData: Landing | null;
    headerData: Header | null;
}

class LandingPage extends React.Component<HomeComponentProps, HomeComponentState> {

    constructor(props: HomeComponentProps) {
        super(props);

        this.state = {
            landingPageData: null,
            headerData: null
        };
    }

    componentDidMount() {
        const headerApi = ApiFactory.getInstance().getHeaderApi();
        const landingApi = ApiFactory.getInstance().getLandingApi();

        headerApi.headerGet().then(response => {
            if (response.data) {
                this.setState({
                    headerData: response.data
                });
            }
        });

        landingApi.landingGet().then(response => {
            if (response.data) {
                this.setState({
                    landingPageData: response.data
                });
            }
        });
    }

    render() {
        if (!this.state.landingPageData || !this.state.headerData) {
            return (<Spinner className={'page-spinner'}/>);
        } else {
            return (
                <main>
                    {this.state.landingPageData.header && this.state.headerData?.navbar ?
                        <HeaderComponent
                            navbarData={this.state.headerData.navbar}
                            headerData={this.state.landingPageData.header}/> :
                        <div/>}
                    <Content>
                        <Row>
                            <Col>
                                <Card className={'icon-card'}>
                                    <h5><i className="fa fa-code"/>Software Engineer</h5>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                                        vero
                                        eos et accusam et justo duo dolores et ea rebum.</p>
                                    <CardLink text={'Test'}
                                              href={'#'}/>
                                </Card>
                            </Col>
                            <Col>
                                <Card className={'icon-card'}>
                                    <h5><i className="fa fa-music"/>Musician</h5>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                                        vero
                                        eos et accusam et justo duo dolores et ea rebum.</p>
                                    <CardLink text={'Test'}
                                              href={'#'}/>
                                </Card>
                            </Col>
                            <Col>
                                <Card className={'icon-card'}>
                                    <h5><i className="fa fa-headphones"/>Producer</h5>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                                        vero
                                        eos et accusam et justo duo dolores et ea rebum.</p>
                                    <CardLink text={'Test'}
                                              href={'#'}/>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                    {this.state.headerData?.footer?
                        <FooterComponent footerData={this.state.headerData.footer}/> : <div/>}
                </main>
            );
        }
    }
}

export default LandingPage;
