import React from 'react';
import {Project} from '../../../../.openapi';
import {Badge, Button, Card, Col, Modal, Row} from 'reactstrap';
import CardLink from '../../card/cardLink/CardLink';
import Content from '../Content';
import ReactMarkdown from 'react-markdown';
import {withTranslation, WithTranslation} from 'react-i18next';

interface ProjectsContentComponentProps extends WithTranslation {
    projects: Project[];
}

interface ProjectsContentComponentState {
    showModalDialog: boolean;
    currentProject?: Project;
}

class ProjectsContent extends React.Component<ProjectsContentComponentProps, ProjectsContentComponentState> {

    constructor(props: ProjectsContentComponentProps) {
        super(props);

        this.state = {
            showModalDialog: false,
            currentProject: undefined
        };
    }


    toggleProjectDialog(project?: Project): void {
        this.setState({
            showModalDialog: (!!project),
            currentProject: project
        });
    }

    render() {
        return (
            <Content title={this.props.t('Projects.Title')}>
                <Row>
                    {this.props.projects.map((project, index) => (
                        <Col md={4}
                             key={'projects_' + project.name}
                             data-aos={'fade-up'}
                             data-aos-delay={index * 100}>
                            <Card>
                                {project.bannerImages?.data ?
                                    <img alt={project.bannerImages.data[0].attributes?.alternativeText}
                                         src={project.bannerImages.data[0].attributes?.url}/> : ''}
                                <h5>{project.name}</h5>
                                <p>
                                    {project.tags?.data?.map(tag => (
                                        <Badge
                                            color={tag.attributes?.color}
                                            key={'project_badge_' + tag.id}>
                                            {tag.attributes?.name}
                                        </Badge>
                                    ))}
                                </p>
                                <p>
                                    {project.shortText}
                                    &nbsp;
                                    <CardLink
                                        isLearnMoreLink
                                        text={'More'}
                                        onClick={() => this.toggleProjectDialog(project)}/>
                                </p>
                                <p>
                                    {project.links?.map(link => (
                                        <CardLink
                                            href={link.url}
                                            text={link.title || ''}
                                            key={'projects_link_' + link.id}/>
                                    ))}
                                </p>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {this.state.currentProject ?
                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.showModalDialog}
                        toggle={() => this.toggleProjectDialog()}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {this.state.currentProject.name}
                            </h5>
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleProjectDialog()}>
                                <span aria-hidden={true}><i className={'fa fa-times'}/></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ReactMarkdown>
                                {this.state.currentProject.content || ''}
                            </ReactMarkdown>
                        </div>
                        <div className="modal-footer">
                            {this.state.currentProject.links?.map(link => (
                                <CardLink
                                    href={link.url}
                                    text={link.title || ''}
                                    key={'projects_modal_link_' + link.id}/>
                            ))}
                            <Button
                                className={'btn-sm'}
                                color="primary"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleProjectDialog()}>
                                Close
                            </Button>
                        </div>
                    </Modal> : <div/>}
            </Content>
        );
    }
}

export default withTranslation()(ProjectsContent);
