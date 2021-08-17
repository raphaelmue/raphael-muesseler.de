import React  from 'react';
import {Link} from 'react-router-dom';

interface CardLinkComponentProps {
    href: string;
    text: string;
    isLearnMoreLink?: boolean;
}

interface CardLinkComponentState {
}

class CardLink extends React.Component<CardLinkComponentProps, CardLinkComponentState> {
    render() {
        return (
            <Link to={this.props.href}>
                <span className={'card-link' + (this.props.isLearnMoreLink ? '-learn-more' : '')}>
                    {this.props.text}
                    {this.props.isLearnMoreLink ?
                    <i className={'fas fa-arrow-right'}/> : <span/> }
                </span>
            </Link>
        );
    }
}

export default CardLink;
