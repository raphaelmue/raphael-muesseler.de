import React           from 'react';
import {Spinner}       from 'reactstrap';
import HeaderComponent from '../shared/header/HeaderComponent';
import ApiFactory      from '../../api/ApiFactory';
import FooterComponent from '../shared/footer/FooterComponent';
import ProjectsContent from '../shared/content/projectsContent/ProjectsContent';
import {
    MasterDataResponseDataObject,
    ProjectPageResponseDataObject
}                      from '../../.openapi';

interface ProjectPageComponentProps {
}

interface ProjectPageComponentState {
    projectPageData?: ProjectPageResponseDataObject;
    masterData?: MasterDataResponseDataObject;
    projects: ProjectPageResponseDataObject[];
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
                this.setState({masterData: response.data.data[0]});
            }
        });

        projectPageApi.getProjectPage(ApiFactory.getLocale()).then(response => {
            if (response.data.data) {
                this.setState({projectPageData: response.data.data[0]});
            }
        });

        projectApi.getProjects(ApiFactory.getLocale(),).then(response => {
            if (response.data.data) {
                this.setState({projects: response.data.data});
            }
        });
    }

    render() {
        if (!this.state.masterData || !this.state.projectPageData || !this.state.projectPageData.attributes?.header) {
            return (<Spinner className={'page-spinner'}/>);
        } else {

            return (
                <main>
                    <HeaderComponent
                        masterData={this.state.masterData}
                        headerData={this.state.projectPageData.attributes?.header}/>
                    <ProjectsContent projects={this.state.projects}/>
                    <FooterComponent masterData={this.state.masterData}/>
                </main>
            );
        }
    }
}

export default ProjectPage;
