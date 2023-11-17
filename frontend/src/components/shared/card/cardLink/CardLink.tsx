import React from 'react';
import {Link} from "react-router-dom";

interface CardLinkComponentProps {
    href?: string;
    text: string;
    isLearnMoreLink?: boolean;
    isExternal?: boolean
    onClick?: () => void;
}

interface CardLinkComponentState {
}

class CardLink extends React.Component<CardLinkComponentProps, CardLinkComponentState> {
    render() {
        const content = (
            <span className={'card-link' + (this.props.isLearnMoreLink ? '-learn-more' : '')}>
                {this.props.text}
                {this.props.isLearnMoreLink ?
                    <i className={'fas fa-arrow-right'}/> : <span/>}
            </span>
        );

        if (this.props.isExternal) {
            return (
                <a href={this.props.href || ''} target={"_blank"} rel={"noreferrer"}>
                    {content}
                </a>
            );
        } else {
            return (
                <Link to={this.props.href || ''}
                      onClick={event => {
                          if (!this.props.href) event.preventDefault();
                          if (this.props.onClick) this.props.onClick();
                      }}>
                    {content}
                </Link>
            );
        }
    }
}

export default CardLink;
