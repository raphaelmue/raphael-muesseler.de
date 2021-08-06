import React  from 'react';
import {Link} from 'react-router-dom';

interface CardLinkComponentProps {
    href: string;
    text: string;
}

interface CardLinkComponentState {
}

class CardLink extends React.Component<CardLinkComponentProps, CardLinkComponentState> {
    render() {
        return (
            <Link to={this.props.href}>
                <span className={'card-link'}>
                    {this.props.text}
                    <i className={'fas fa-arrow-right'}/>
                </span>
            </Link>
        );
    }
}

export default CardLink;
