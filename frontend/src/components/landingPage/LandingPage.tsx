import React                                              from 'react';
import {Card, Col, Row, Spinner}                          from 'reactstrap';
import Content                                            from '../shared/content/Content';
import CardLink                                           from '../shared/card/cardLink/CardLink';
import {Header, LandingPage as LandingPageData, Projects} from '../../.openapi';
import ApiFactory                                         from '../../api/ApiFactory';
import FooterComponent                                    from '../shared/footer/FooterComponent';
import ContactForm                                        from '../shared/contactForm/ContactForm';
import HeaderComponent                                    from '../shared/header/HeaderComponent';
import ProjectsContent                                    from '../shared/content/projectsContent/ProjectsContent';
import {withTranslation, WithTranslationProps}            from 'react-i18next';

interface HomeComponentProps extends WithTranslationProps {
}

interface HomeComponentState {
    landingPageData: LandingPageData | null;
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
        const landingApi = ApiFactory.getInstance().getLandingPageApi();
        const projectApi = ApiFactory.getInstance().getProjectApi();

        headerApi.headerGet(ApiFactory.getLocale()).then(response => {
            if (response.data) {
                this.setState({headerData: response.data});
            }
        });

        landingApi.landingPageGet(ApiFactory.getLocale()).then(response => {
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
                            {this.state.landingPageData.aboutMeContainer.content.map((content, index) => (
                                <Col md={4}
                                     key={'aboutMeContainer_' + content.id}
                                     data-aos={'fade-up'}
                                     data-aos-delay={index * 100}>
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
                    <ProjectsContent projects={this.state.projects}/>
                    <ContactForm/>
                    <FooterComponent headerData={this.state.headerData}/>
                </main>
            );
        }
    }
}

export default withTranslation()(LandingPage);
