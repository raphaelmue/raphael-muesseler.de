import React                            from 'react';
import {Badge, Card, Col, Row, Spinner} from 'reactstrap';
import Content                          from '../shared/content/Content';
import CardLink                         from '../shared/card/cardLink/CardLink';
import {Header, Landing, Projects}      from '../../.openapi';
import ApiFactory                       from '../../api/ApiFactory';
import FooterComponent                  from '../shared/footer/FooterComponent';
import ContactForm                      from '../shared/contactForm/ContactForm';
import HeaderComponent                  from '../shared/header/HeaderComponent';

interface HomeComponentProps {
}

interface HomeComponentState {
    landingPageData: Landing | null;
    headerData: Header | null;
    projects: Projects[];
}

class LandingPage extends React.Component<HomeComponentProps, HomeComponentState> {

    constructor(props: HomeComponentProps) {
        super(props);

        this.state = {
            landingPageData: null,
            headerData: null,
            projects: []
        };
    }

    componentDidMount() {
        const headerApi = ApiFactory.getInstance().getHeaderApi();
        const landingApi = ApiFactory.getInstance().getLandingApi();
        const projectApi = ApiFactory.getInstance().getProjectApi();

        headerApi.headerGet(ApiFactory.getLocale()).then(response => {
            if (response.data) {
                this.setState({headerData: response.data});
            }
        });

        landingApi.landingGet(ApiFactory.getLocale()).then(response => {
            if (response.data) {
                this.setState({landingPageData: response.data});
            }
        });

        projectApi.projectsGet(ApiFactory.getLocale(), true).then(response => {
            if (response.data) {
                this.setState({projects: response.data});
            }
        });
    }

    render() {
        if (!this.state.landingPageData || !this.state.headerData) {
            return (<Spinner className={'page-spinner'}/>);
        } else {

            return (
                <main>
                    <HeaderComponent
                        navbarData={this.state.headerData.navbar}
                        headerData={this.state.landingPageData.header}/>
                    <Content title={this.state.landingPageData.aboutMeContainer.title}>
                        <Row>
                            {this.state.landingPageData.aboutMeContainer.content.map(content => (
                                <Col md={4}>
                                    <Card className={'icon-card'}>
                                        <i className={'heading-icon fa fa-' + content.icon + ' ' + content.color}/>
                                        <h5 className={content.color}>{content.title}</h5>
                                        <p>{content.content}</p>
                                        <p><CardLink text={'Test'}
                                                     href={content.learn_more_url || ''}/></p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Content>
                    <Content title={'Projects'}>
                        <Row>
                            {this.state.projects.map(project => (
                                <Col md={4}>
                                    <Card>
                                        <img src={ApiFactory.getInstance().getImageURL(project.bannerImages[0])}/>
                                        <h5>{project.name}</h5>
                                        <p>
                                            {project.tags?.map(tag => (
                                                <Badge color={tag.color}>{tag.name}</Badge>
                                            ))}
                                        </p>
                                        <p>
                                            {project.shortText} <CardLink isLearnMoreLink href={''} text={'Mehr'}/>
                                        </p>
                                        <p>
                                            {project.links?.map(link => (
                                                <CardLink href={link.url} text={link.title}/>
                                            ))}
                                        </p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Content>
                    <ContactForm/>
                    <FooterComponent headerData={this.state.headerData}/>
                </main>
            );
        }
    }
}

export default LandingPage;
