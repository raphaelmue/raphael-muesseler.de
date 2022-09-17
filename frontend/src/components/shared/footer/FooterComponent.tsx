import React                              from 'react';
import {MasterDataResponseDataObject}     from '../../../.openapi';
import Content                            from '../content/Content';
import {Col, Row}                         from 'reactstrap';
import {Link}                             from 'react-router-dom';
import {withTranslation, WithTranslation} from 'react-i18next';

interface FooterComponentProps extends WithTranslation {
    masterData: MasterDataResponseDataObject
}

interface FooterComponentState {
}

class FooterComponent extends React.Component<FooterComponentProps, FooterComponentState> {
    render() {
        return (
            <footer>
                <Content>
                    <Row>
                        <Col>
                            <h4>{this.props.t('Contact.Title')}</h4>
                            <p>
                                {this.props.masterData.attributes?.contact?.name}
                                <br/>
                                <a href={'mailto:' + this.props.masterData.attributes?.contact?.email}>
                                    {this.props.masterData.attributes?.contact?.email}
                                </a>
                            </p>
                            <a href={this.props.masterData.attributes?.contact?.socialMedia?.instagram}
                               className={'social-media-link'}>
                                <i className={'fa fa-instagram'}/>
                            </a>
                            <a href={this.props.masterData.attributes?.contact?.socialMedia?.github}
                               className={'social-media-link'}>
                                <i className={'fa fa-github'}/>
                            </a>
                            <a href={this.props.masterData.attributes?.contact?.socialMedia?.youtube}
                               className={'social-media-link'}>
                                <i className={'fa fa-youtube'}/>
                            </a>
                            <a href={this.props.masterData.attributes?.contact?.socialMedia?.spotify}
                               className={'social-media-link'}>
                                <i className={'fa fa-spotify'}/>
                            </a>
                        </Col>
                        <Col>
                            <h4>Links</h4>
                            <p>
                                {this.props.masterData?.attributes?.footer?.links?.map(link => (
                                    <Link
                                        to={link.url || ''}
                                        key={'footerLink_' + link.id}>
                                        {link.title}
                                    </Link>
                                ))}
                            </p>
                        </Col>
                        <Col>
                            <h4>Copyright</h4>
                            <p>
                                <i className={'fa fa-copyright'}/> {this.props.masterData.attributes?.contact?.name} {this.props.masterData.attributes?.footer?.copyright?.creationYear}
                                <br/>
                                {this.props.masterData.attributes?.footer?.copyright?.fontawesomeInfo}
                            </p>
                        </Col>
                    </Row>
                </Content>
            </footer>
        );
    }
}

export default withTranslation()(FooterComponent);
