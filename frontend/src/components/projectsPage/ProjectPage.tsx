import React from 'react';
import {Spinner} from 'reactstrap';
import HeaderComponent from '../shared/header/HeaderComponent';
import ApiFactory from '../../api/ApiFactory';
import FooterComponent from '../shared/footer/FooterComponent';
import ProjectsContent from '../shared/content/projectsContent/ProjectsContent';
import {MasterData, Project, ProjectPage as ProjectPageData} from '../../.openapi';

interface ProjectPageComponentProps {
}

interface ProjectPageComponentState {
    projectPageData?: ProjectPageData;
    masterData?: MasterData;
    projects: Project[];
}

class ProjectPage extends React.Component<ProjectPageComponentProps, ProjectPageComponentState> {
    constructor(props: ProjectPageComponentProps) {
        super(props);

        this.state = {
            projectPageData: undefined,
            masterData: undefined,
            projects: []
        }
    }


    componentDidMount(): void {
        const headerApi = ApiFactory.getInstance().getMasterDataApi();
        const projectPageApi = ApiFactory.getInstance().getProjectPageApi();
        const projectApi = ApiFactory.getInstance().getProjectApi();

        headerApi.getMasterData(ApiFactory.getLocale()).then(response => {
            if (response.data.data) {
                this.setState({masterData: response.data.data.attributes});
            }
        });

        projectPageApi.getProjectPage(ApiFactory.getLocale()).then(response => {
            if (response.data.data) {
                this.setState({projectPageData: response.data.data.attributes});
            }
        });

        projectApi.getProjects(ApiFactory.getLocale(),).then(response => {
            if (response.data.data) {
                this.setState({projects: response.data.data.map(response => response.attributes!)});
            }
        });
    }

    render(): React.ReactElement {
        if (!this.state.masterData || !this.state.projectPageData || !this.state.projectPageData.header) {
            return (<Spinner className={'page-spinner'}/>);
        } else {

            return (
                <main>
                    <HeaderComponent
                        masterData={this.state.masterData}
                        headerData={this.state.projectPageData.header}/>
                    <ProjectsContent projects={this.state.projects}/>
                    <FooterComponent masterData={this.state.masterData}/>
                </main>
            );
        }
    }
}

export default ProjectPage;
