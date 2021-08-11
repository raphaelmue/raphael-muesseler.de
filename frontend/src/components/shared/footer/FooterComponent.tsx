import React          from 'react';
import {HeaderFooter} from '../../../.openapi';
import Content        from '../content/Content';
import {Col, Row}          from 'reactstrap';

interface FooterComponentProps {
    footerData: HeaderFooter;
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

                        </Col>
                    </Row>
                </Content>
            </footer>
        );
    }
}

export default FooterComponent;
