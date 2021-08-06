import React       from 'react';
import {Container} from 'reactstrap';

interface ContentComponentProps {
}

interface ContentComponentState {
}

class Content extends React.Component<ContentComponentProps, ContentComponentState> {
    render() {
        return (
            <section className={'content-section'}>
                <Container>
                    {this.props.children}
                </Container>
            </section>
        )
    }
}
export default Content;
