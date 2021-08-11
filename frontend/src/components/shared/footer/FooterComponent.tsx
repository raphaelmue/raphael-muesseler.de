import React      from 'react';
import {Header}   from '../../../.openapi';
import Content    from '../content/Content';
import {Col, Row} from 'reactstrap';
import {Link}     from 'react-router-dom';

interface FooterComponentProps {
    headerData: Header;
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
                            <h4>Contact</h4>
                            <p>
                                {this.props.headerData.contact?.name}
                                <br/>
                                <a href={'mailto:' + this.props.headerData.contact?.email}>
                                    {this.props.headerData.contact?.email}
                                </a>
                            </p>
                            <a href={this.props.headerData.contact?.socialMedia?.instagram}
                               className={'social-media-link'}>
                                <i className={'fa fa-instagram'}/>
                            </a>
                            <a href={this.props.headerData.contact?.socialMedia?.youtube}
                               className={'social-media-link'}>
                                <i className={'fa fa-youtube'}/>
                            </a>
                            <a href={this.props.headerData.contact?.socialMedia?.spotify}
                               className={'social-media-link'}>
                                <i className={'fa fa-spotify'}/>
                            </a>
                            <a href={this.props.headerData.contact?.socialMedia?.github}
                               className={'social-media-link'}>
                                <i className={'fa fa-github'}/>
                            </a>
                        </Col>
                        <Col>
                            <h4>Links</h4>
                            <p>
                                {this.props.headerData.footer?.links?.map(link => (
                                    <Link to={link.url || ''}>{link.title}</Link>
                                ))}
                            </p>
                        </Col>
                        <Col>
                            <h4>Copyright</h4>
                            <p>
                                <i className={'fa fa-copyright'}/> {this.props.headerData.contact?.name} {this.props.headerData.footer?.copyright?.creationYear}
                                <br/>
                                {this.props.headerData.footer?.copyright?.fontawesomeInfo}
                            </p>
                        </Col>
                    </Row>
                </Content>
            </footer>
        );
    }
}

export default FooterComponent;
