import React                                   from 'react';
import {Row, Spinner}                          from 'reactstrap';
import Content                                 from '../shared/content/Content';
import {
    LandingPageResponseDataObject,
    MasterDataResponseDataObject,
    ProjectResponseDataObject
}                                              from '../../.openapi';
import ApiFactory                              from '../../api/ApiFactory';
import FooterComponent                         from '../shared/footer/FooterComponent';
import ContactForm                             from '../shared/contactForm/ContactForm';
import HeaderComponent                         from '../shared/header/HeaderComponent';
import ProjectsContent                         from '../shared/content/projectsContent/ProjectsContent';
import {withTranslation, WithTranslationProps} from 'react-i18next';

interface HomeComponentProps extends WithTranslationProps {
}

interface HomeComponentState {
    landingPageData?: LandingPageResponseDataObject;
    masterData?: MasterDataResponseDataObject;
    projects: ProjectResponseDataObject[];
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

        masterDataApi.getMasterData(ApiFactory.getLocale()).then(response => {
            if (response.data.data) {
                this.setState({masterData: response.data.data[0]});
            }
        });

        landingApi.getLandingPage(ApiFactory.getLocale()).then(response => {
            if (response.data.data) {
                this.setState({landingPageData: response.data.data[0]});
            }
        });

        projectApi.getProjects(ApiFactory.getLocale(), true).then(response => {
            if (response.data.data) {
                this.setState({projects: response.data.data});
            }
        });
    }

    render() {
        if (!this.state.landingPageData || !this.state.masterData || !this.state.landingPageData.attributes?.header) {
            return (<Spinner className={'page-spinner'}/>);
        } else {
            return (
                <main>
                    <HeaderComponent
                        masterData={this.state.masterData}
                        headerData={this.state.landingPageData.attributes?.header}/>
                    <Content title={this.state.landingPageData.attributes?.aboutMeContainer?.title}>
                        <Row>
                            {/*{this.state.landingPageData.attributes?.aboutMeContainer?.content?.map((content, index) => (*/}
                            {/*    <Col md={4}*/}
                            {/*         key={'aboutMeContainer_' + content.id}*/}
                            {/*         data-aos={'fade-up'}*/}
                            {/*         data-aos-delay={index * 100}>*/}
                            {/*        <Card className={'icon-card'}>*/}
                            {/*            <i className={'heading-icon fa fa-' + content.icon + ' ' + content.color}/>*/}
                            {/*            <h5 className={content.color}>{content.title}</h5>*/}
                            {/*            <p>{content.content}</p>*/}
                            {/*            <p><CardLink text={'Test'}*/}
                            {/*                         href={content.learn_more_url || ''}/></p>*/}
                            {/*        </Card>*/}
                            {/*    </Col>*/}
                            {/*))}*/}
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
