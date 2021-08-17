import React                                              from 'react';
import {Badge, Card, Col, Row, Spinner}                   from 'reactstrap';
import HeaderComponent                                    from '../shared/header/HeaderComponent';
import Content                                            from '../shared/content/Content';
import CardLink                                           from '../shared/card/cardLink/CardLink';
import ApiFactory                                         from '../../api/ApiFactory';
import ContactForm                                        from '../shared/contactForm/ContactForm';
import FooterComponent                                    from '../shared/footer/FooterComponent';
import {Header, ProjectPage as ProjectPageData, Projects} from '../../.openapi';

interface ProjectPageComponentProps {
}

interface ProjectPageComponentState {
    projectPageData: ProjectPageData | null;
    headerData: Header | null;
    projects: Projects[];
}

class ProjectPage extends React.Component<ProjectPageComponentProps, ProjectPageComponentState> {
    constructor(props: ProjectPageComponentProps) {
        super(props);

        this.state = {
            projectPageData: null,
            headerData: null,
            projects: []
        }
    }


    componentDidMount() {
        const headerApi = ApiFactory.getInstance().getHeaderApi();
        const landingApi = ApiFactory.getInstance().getProjectPageApi();
        const projectApi = ApiFactory.getInstance().getProjectApi();

        headerApi.headerGet(ApiFactory.getLocale()).then(response => {
            if (response.data) {
                this.setState({headerData: response.data});
            }
        });

        landingApi.projectPageGet(ApiFactory.getLocale()).then(response => {
            if (response.data) {
                this.setState({projectPageData: response.data});
            }
        });

        projectApi.projectsGet(ApiFactory.getLocale(),).then(response => {
            if (response.data) {
                this.setState({projects: response.data});
            }
        });
    }

    render() {
        if (!this.state.headerData || !this.state.projectPageData) {
            return (<Spinner className={'page-spinner'}/>);
        } else {

            return (
                <main>
                    <HeaderComponent
                        navbarData={this.state.headerData.navbar}
                        headerData={this.state.projectPageData.header}/>
                    <Content title={'Projects'}>
                        <Row>
                            {this.state.projects.map(project => (
                                <Col md={4} key={'projects_' + project.id}>
                                    <Card>
                                        <img src={ApiFactory.getInstance().getImageURL(project.bannerImages[0])}/>
                                        <h5>{project.name}</h5>
                                        <p>
                                            {project.tags?.map(tag => (
                                                <Badge
                                                    color={tag.color}
                                                    key={'project_badge_' + tag.id}>
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                        </p>
                                        <p>
                                            {project.shortText} <CardLink isLearnMoreLink href={''} text={'Mehr'}/>
                                        </p>
                                        <p>
                                            {project.links?.map(link => (
                                                <CardLink
                                                    href={link.url}
                                                    text={link.title}
                                                    key={'projects_link_' + link.id}/>
                                            ))}
                                        </p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Content>
                    <FooterComponent headerData={this.state.headerData}/>
                </main>
            );
        }
    }
}

export default ProjectPage;
