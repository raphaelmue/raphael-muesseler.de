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
                    {this.state.landingPageData.containers?.map(container => (
                        <Content title={container.title}>
                            <Row>
                                {container.content?.map(content => (
                                    <Col md={4}>
                                        <Card className={'icon-card'}>
                                            <i className={'heading-icon fa fa-' + content.icon + ' ' + content.color}/>
                                            <h5 className={content.color}>{content.title}</h5>
                                            <p>{content.content}</p>
                                            <CardLink text={'Test'}
                                                      href={content.learn_more_url || ''}/>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Content>
                    ))}
                    {this.state.headerData ?
                        <FooterComponent headerData={this.state.headerData}/> : <div/>}
                </main>
            );
        }
    }
}

export default LandingPage;
