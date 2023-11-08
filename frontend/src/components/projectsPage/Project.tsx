import React from "react";
import HeaderComponent from "../shared/header/HeaderComponent";
import ApiFactory, {Image} from "../../api/ApiFactory";
import {MasterData, Project as ProjectData} from "../../.openapi";
import {WithTranslation, withTranslation} from "react-i18next";
import {Badge, Spinner, UncontrolledCarousel} from "reactstrap";
import {RouteComponentProps} from "react-router-dom";
import Content from "../shared/content/Content";
import Markdown from "react-markdown";
import FooterComponent from "../shared/footer/FooterComponent";
import CardLink from "../shared/card/cardLink/CardLink";

type ProjectParameters = {
    projectId?: string;
}

interface ProjectComponentProps extends WithTranslation, RouteComponentProps<ProjectParameters> {
}

interface ProjectComponentState {
    masterData?: MasterData;
    project?: ProjectData;
}

class Project extends React.Component<ProjectComponentProps, ProjectComponentState> {
    constructor(props: ProjectComponentProps) {
        super(props)

        this.state = {
            masterData: undefined,
            project: undefined
        }

    }

    componentDidMount(): void {
        const masterDataApi = ApiFactory.getInstance().getMasterDataApi();
        const projectApi = ApiFactory.getInstance().getProjectApi();

        masterDataApi.getMasterData(ApiFactory.getAPIParameters()).then(response => {
            if (response.data.data && response.data.data.attributes) {
                this.setState({masterData: response.data.data.attributes});
            }
        });

        if (this.props.match.params.projectId) {
            projectApi.getProjectsId({id: parseInt(this.props.match.params.projectId)}, {params: ApiFactory.getAPIParameters()}).then(response => {
                if (response.data.data && response.data.data.attributes) {
                    this.setState({project: response.data.data.attributes});
                }
            });
        }
    }

    render() {
        if (!this.state.masterData || !this.state.project) {
            return (<Spinner className={'page-spinner'}/>);
        } else {
            const backgroundImage = this.state.project.bannerImages.data![0];

            return (
                <main>
                    <HeaderComponent
                        masterData={this.state.masterData}
                        headerData={{
                            title: this.state.project.name,
                            pretitle: this.props.t("Projects.Project"),
                            description: this.state.project.shortText,
                            backgroundImage: {data: backgroundImage}
                        }}/>
                    <Content title={this.props.t('Projects.Project')}>

                        <Markdown>
                            {this.state.project.content || ''}
                        </Markdown>
                        <p>
                            {this.state.project.tags?.data?.map(tag => (
                                <Badge
                                    color={tag.attributes?.color}
                                    key={'project_badge_' + tag.id}>
                                    {tag.attributes?.name}
                                </Badge>
                            ))}
                        </p>
                        <p>
                            {this.state.project.links?.map(link => (
                                <CardLink
                                    href={link.url}
                                    text={link.title || ''}
                                    key={'projects_link_' + link.id}/>
                            ))}
                        </p>
                    </Content>
                    {this.state.project.bannerImages.data!.length > 1 &&
                        <Content title={this.props.t('General.Gallery')}>
                            <UncontrolledCarousel
                                items={this.state.project.bannerImages.data!.map((value, index) => {
                                    return {
                                        key: index,
                                        src: ApiFactory.getInstance().getImageURL(value as Image)
                                    }
                                })}/>
                        </Content>
                    }
                    <FooterComponent masterData={this.state.masterData}/>
                </main>
            );
        }
    }
}

export default withTranslation()(Project);
