import React from 'react';
import {Card, CardLink, Col, Row, Spinner} from 'reactstrap';
import Content from '../shared/content/Content';
import {LandingPage as LandingPageData, MasterData, ProjectListResponseDataItem} from '../../.openapi';
import ApiFactory from '../../api/ApiFactory';
import FooterComponent from '../shared/footer/FooterComponent';
import ContactForm from '../shared/contactForm/ContactForm';
import HeaderComponent from '../shared/header/HeaderComponent';
import ProjectsContent from '../shared/content/projectsContent/ProjectCards';
import {WithTranslation, withTranslation} from 'react-i18next';

interface HomeComponentProps extends WithTranslation {
}

interface HomeComponentState {
    landingPageData?: LandingPageData;
    masterData?: MasterData;
    projects: ProjectListResponseDataItem[];
}

class LandingPage extends React.Component<HomeComponentProps, HomeComponentState> {

    constructor(props: HomeComponentProps) {
        super(props);

        this.state = {
            landingPageData: undefined,
            masterData: undefined,
            projects: []
        };
    }

    componentDidMount() {
        const masterDataApi = ApiFactory.getInstance().getMasterDataApi();
        const landingApi = ApiFactory.getInstance().getLandingPageApi();
        const projectApi = ApiFactory.getInstance().getProjectApi();

        masterDataApi.getMasterData(ApiFactory.getAPIParameters()).then(response => {
            if (response.data.data) {
                this.setState({masterData: response.data.data.attributes});
            }
        });

        landingApi.getLandingPage(ApiFactory.getAPIParameters()).then(response => {
            if (response.data.data) {
                this.setState({landingPageData: response.data.data.attributes});
            }
        });

        projectApi.getProjects(ApiFactory.getAPIParameters()).then(response => {
            if (response.data.data) {
                this.setState({projects: response.data.data});
            }
        });
    }

    render() {
        if (!this.state.landingPageData || !this.state.masterData || !this.state.landingPageData.header) {
            return (<Spinner className={'page-spinner'}/>);
        } else {
            return (
                <main>
                    <HeaderComponent
                        masterData={this.state.masterData}
                        headerData={this.state.landingPageData.header}/>
                    <Content title={this.props.t('Landing.AboutMe')}>

                        <Row>
                            {this.state.landingPageData.aboutMeContainer.map((content, index) => (
                                <Col md={4}
                                     key={'aboutMeContainer_' + content.id}
                                     data-aos={'fade-up'}
                                     data-aos-delay={index * 100}>
                                    <Card className={'icon-card'}>
                                        <i className={'heading-icon fa fa-' + content.icon + ' ' + content.color}/>
                                        <h5 className={content.color}>{content.title}</h5>
                                        <p>{content.content}</p>
                                        <p><CardLink text={'Test'}
                                                     href={content.learnMoreURL || ''}/></p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Content>
                    <ProjectsContent projects={this.state.projects}/>
                    <ContactForm/>
                    <FooterComponent masterData={this.state.masterData}/>
                </main>
            );
        }
    }
}

export default withTranslation()(LandingPage);
