import React           from 'react';
import {LandingHeader} from '../../../../.openapi';
import ApiFactory      from '../../../../api/ApiFactory';

interface BannerComponentProps {
    headerData: LandingHeader;
}

interface BannerComponentState {
}

class Banner extends React.Component<BannerComponentProps, BannerComponentState> {
    render() {
        return (
            <section className={'banner'}
                     style={{
                         backgroundImage: `url(${this.props.headerData.backgroundImage ?
                             ApiFactory.getInstance().getImageURL(this.props.headerData.backgroundImage) :
                             ''})`
                     }}>
                <article className={'banner-heading'}>
                    <p className={'banner-heading-iam'}>{this.props.headerData?.pretitle}</p>
                    <h1 className="banner-heading-name">{this.props.headerData?.title}</h1>
                    <p className={'banner-heading-subtitle'}>Software Engineer | Musician | Producer</p>
                    <p className={'banner-description'}>{this.props.headerData?.description}</p>
                </article>
                <article>
                    <span className={'banner-scroll-button'}><i className="fas fa-chevron-down"/></span>
                </article>
            </section>
        );
    }
}

export default Banner;
