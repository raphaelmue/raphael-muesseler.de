import React                                              from 'react';
import {Badge, Card, Col, Row, Spinner}                   from 'reactstrap';
import HeaderComponent                                    from '../shared/header/HeaderComponent';
import Content                                            from '../shared/content/Content';
import CardLink                                           from '../shared/card/cardLink/CardLink';
import ApiFactory                                         from '../../api/ApiFactory';
import ContactForm                                        from '../shared/contactForm/ContactForm';
import FooterComponent                                    from '../shared/footer/FooterComponent';
import {Header, ProjectPage as ProjectPageData, Projects} from '../../.openapi';
import ProjectsContent                                    from '../shared/content/projectsContent/ProjectsContent';

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
                    <ProjectsContent projects={this.state.projects} />
                    <FooterComponent headerData={this.state.headerData}/>
                </main>
            );
        }
    }
}

export default ProjectPage;
