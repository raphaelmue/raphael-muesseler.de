import React                                  from 'react';
import {Projects}                             from '../../../../.openapi';
import {Badge, Button, Card, Col, Modal, Row} from 'reactstrap';
import ApiFactory                             from '../../../../api/ApiFactory';
import CardLink                               from '../../card/cardLink/CardLink';
import Content                                from '../Content';
import ReactMarkdown from 'react-markdown';

interface ProjectsContentComponentProps {
    projects: Projects[];
}

interface ProjectsContentComponentState {
    showModalDialog: boolean;
    currentProject: Projects | undefined;
}

class ProjectsContent extends React.Component<ProjectsContentComponentProps, ProjectsContentComponentState> {

    constructor(props: ProjectsContentComponentProps) {
        super(props);

        this.state = {
            showModalDialog: false,
            currentProject: undefined
        };
    }


    toggleProjectDialog(project?: Projects): void {
        this.setState({
            showModalDialog: (!!project),
            currentProject: project
        });
    }

    render() {
        return (
            <Content title={'Projects'}>
                <Row>
                    {this.props.projects.map(project => (
                        <Col md={4} key={'projects_' + project.id}>
                            <Card>
                                <img alt={project.bannerImages[0].alternativeText}
                                     src={ApiFactory.getInstance().getImageURL(project.bannerImages[0])}/>
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
                                            text={link.title}
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
                                {this.state.currentProject.content}
                            </ReactMarkdown>
                        </div>
                        <div className="modal-footer">
                                {this.state.currentProject.links?.map(link => (
                                    <CardLink
                                        href={link.url}
                                        text={link.title}
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

export default ProjectsContent;
