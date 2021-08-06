import React from 'react';

interface BannerComponentProps {
}

interface BannerComponentState {
}

class Banner extends React.Component<BannerComponentProps, BannerComponentState> {
    render() {
        return (
            <section className={'banner'}
                     style={{backgroundImage: 'url(\'images/profile-image.jpeg\')'}}>
                <article className={'banner-heading'}>
                    <p className={'banner-heading-iam'}>Hallo, ich bin</p>
                    <h1 className="banner-heading-name">Raphael Müßeler.</h1>
                    <p className={'banner-heading-subtitle'}>Software Engineer | Musician | Producer</p>
                    <p className={'banner-description'}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                        diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</p>
                </article>
                <article>
                    <span className={'banner-scroll-button'}><i className="fas fa-chevron-down"/></span>
                </article>
            </section>
        );
    }
}

export default Banner;
