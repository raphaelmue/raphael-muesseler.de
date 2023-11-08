import React from 'react';
import {ProjectListResponseDataItem} from '../../../../.openapi';
import {Badge, Card, Col, Row} from 'reactstrap';
import CardLink from '../../card/cardLink/CardLink';
import Content from '../Content';
import {withTranslation, WithTranslation} from 'react-i18next';
import ApiFactory, {Image} from "../../../../api/ApiFactory";

interface ProjectCardsComponentProps extends WithTranslation {
    projects: ProjectListResponseDataItem[];
}

interface ProjectCardsComponentState {
}

class ProjectCards extends React.Component<ProjectCardsComponentProps, ProjectCardsComponentState> {

    constructor(props: ProjectCardsComponentProps) {
        super(props);
    }

    render() {
        return (
            <Content title={this.props.t('Projects.Title')}>
                <Row>
                    {this.props.projects.map((project, index) => (
                        <Col md={4}
                             key={'projects_' + project.attributes!.name}
                             data-aos={'fade-up'}
                             data-aos-delay={index * 100}>
                            <Card>
                                {project.attributes!.bannerImages?.data ?
                                    <img alt={project.attributes!.bannerImages.data[0].attributes?.alternativeText}
                                         src={ApiFactory.getInstance().getImageURL(project.attributes!.bannerImages.data[0] as Image)}/> : ''}
                                <h5>{project.attributes!.name}</h5>
                                <p>
                                    {project.attributes!.tags?.data?.map(tag => (
                                        <Badge
                                            color={tag.attributes?.color}
                                            key={'project_badge_' + tag.id}>
                                            {tag.attributes?.name}
                                        </Badge>
                                    ))}
                                </p>
                                <p>
                                    {project.attributes!.shortText}
                                    &nbsp;
                                    <CardLink
                                        isLearnMoreLink
                                        text={this.props.t("General.Link.More")}
                                        href={"/projects/" + project.id}
                                    />
                                </p>
                                <p>
                                    {project.attributes!.links?.map(link => (
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
            </Content>
        );
    }
}

export default withTranslation()(ProjectCards);
