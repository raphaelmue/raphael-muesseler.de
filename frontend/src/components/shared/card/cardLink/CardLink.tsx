import React  from 'react';
import {Link} from 'react-router-dom';

interface CardLinkComponentProps {
    href?: string;
    text: string;
    isLearnMoreLink?: boolean;
    onClick?: () => void;
}

interface CardLinkComponentState {
}

class CardLink extends React.Component<CardLinkComponentProps, CardLinkComponentState> {
    render() {
        return (
            <a href={this.props.href || ''}
               onClick={event => {
                   if (!this.props.href) event.preventDefault();
                   if (this.props.onClick) this.props.onClick();
               }}>
                <span className={'card-link' + (this.props.isLearnMoreLink ? '-learn-more' : '')}>
                    {this.props.text}
                    {this.props.isLearnMoreLink ?
                        <i className={'fas fa-arrow-right'}/> : <span/>}
                </span>
            </a>
        );
    }
}

export default CardLink;
