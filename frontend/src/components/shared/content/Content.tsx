import React       from 'react';
import {Container} from 'reactstrap';

interface ContentComponentProps {
    title?: string,
    children?: React.ReactElement | React.ReactElement[];
}

interface ContentComponentState {
}

class Content extends React.Component<ContentComponentProps, ContentComponentState> {
    render() {
        return (
            <section className={'content-section'}>
                <Container>
                    {this.props.title ?
                        <h6 className={'content-title'}> {this.props.title} </h6> : <div/>}
                    {this.props.children}
                </Container>
            </section>
        )
    }
}

export default Content;
