import React from 'react';
import {SectionsHeaderComponent} from '../../../../.openapi';
import ApiFactory, {Image} from '../../../../api/ApiFactory';

interface BannerComponentProps {
    headerData: SectionsHeaderComponent;
}

interface BannerComponentState {
}

class Banner extends React.Component<BannerComponentProps, BannerComponentState> {
    getImage(): Image {
        return this.props.headerData.backgroundImage!.data as Image;
    }

    render() {
        return (
            <section className={'banner'}
                     style={{
                         backgroundImage: `url(${ApiFactory.getInstance().getImageURL(this.getImage())})`
                     }}>
                <article className={'banner-heading'} data-aos={'fade-left'}>
                    <p className={'banner-heading-iam'}>
                        {this.props.headerData.pretitle}
                    </p>
                    <h1 className="banner-heading-name">
                        {this.props.headerData.title}
                    </h1>
                    <p className={'banner-heading-subtitle'}>
                        Software Engineer | Musician | Producer
                    </p>
                    <p className={'banner-description'}>
                        {this.props.headerData?.description}
                    </p>
                </article>
                {/*<article>*/}
                {/*    <span className={'banner-scroll-button'}><i className="fas fa-chevron-down"/></span>*/}
                {/*</article>*/}
            </section>
        );
    }
}

export default Banner;
