import React            from 'react';
import Banner           from './banner/Banner';
import Navbar           from './navbar/Navbar';
import {Card, Col, Row} from 'reactstrap';
import Content          from './content/Content';
import CardLink         from '../shared/card/cardLink/CardLink';

interface HomeComponentProps {
}

interface HomeComponentState {
}

class Home extends React.Component<HomeComponentProps, HomeComponentState> {

    render() {
        return (
            <main>
                <Navbar/>
                <Banner/>
                <Content>
                    <Row>
                        <Col>
                            <Card className={'icon-card'}>
                                <h5><i className="fa fa-code"/>Software Engineer</h5>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                                    eos et accusam et justo duo dolores et ea rebum.</p>
                                <CardLink text={'Test'}
                                          href={'#'}/>
                            </Card>
                        </Col>
                        <Col>
                            <Card className={'icon-card'}>
                                <h5><i className="fa fa-music"/>Musician</h5>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                                    eos et accusam et justo duo dolores et ea rebum.</p>
                                <CardLink text={'Test'}
                                          href={'#'}/>
                            </Card>
                        </Col>
                        <Col>
                            <Card className={'icon-card'}>
                                <h5><i className="fa fa-headphones"/>Producer</h5>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                                    eos et accusam et justo duo dolores et ea rebum.</p>
                                <CardLink text={'Test'}
                                          href={'#'}/>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </main>
        );
    }
}

export default Home;
