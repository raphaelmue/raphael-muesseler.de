import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsContact extends Schema.Component {
  collectionName: 'components_components_contacts';
  info: {
    displayName: 'contact';
    icon: 'user';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    email: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    emailDisclaimer: Attribute.Text & Attribute.Required;
    socialMedia: Attribute.Component<'components.social-media'> &
      Attribute.Required;
  };
}

export interface ComponentsCopyright extends Schema.Component {
  collectionName: 'components_components_copyrights';
  info: {
    displayName: 'copyright';
    icon: 'copyright';
    description: '';
  };
  attributes: {
    creationYear: Attribute.Integer & Attribute.Required;
    fontawesomeInfo: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
    icon: 'puzzle-piece';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    icon: Attribute.String;
  };
}

export interface ComponentsSocialMedia extends Schema.Component {
  collectionName: 'components_components_social_medias';
  info: {
    displayName: 'SocialMedia';
    icon: 'users';
    description: '';
  };
  attributes: {
    instagram: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    youtube: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    spotify: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    github: Attribute.String & Attribute.Required;
    website: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsTextbox extends Schema.Component {
  collectionName: 'components_components_textboxes';
  info: {
    displayName: 'Textbox';
    icon: 'inbox';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    icon: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
    learnMoreURL: Attribute.String;
    color: Attribute.String;
  };
}

export interface NavbarNavbarItem extends Schema.Component {
  collectionName: 'components_navbar_navbar_items';
  info: {
    displayName: 'Navbar Item';
    icon: 'sitemap';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    icon: Attribute.String;
  };
}

export interface NavbarNavbar extends Schema.Component {
  collectionName: 'components_navbar_navbars';
  info: {
    displayName: 'Navbar';
    icon: 'desktop';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    logo: Attribute.Media;
    items: Attribute.Component<'navbar.navbar-item', true> & Attribute.Required;
  };
}

export interface SectionsBoxContainer extends Schema.Component {
  collectionName: 'components_sections_box_containers';
  info: {
    displayName: 'Box Container';
    icon: 'box';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.Component<'components.textbox'> & Attribute.Required;
  };
}

export interface SectionsFooter extends Schema.Component {
  collectionName: 'components_sections_footers';
  info: {
    displayName: 'footer';
    icon: 'arrow-down';
  };
  attributes: {
    links: Attribute.Component<'components.link', true> & Attribute.Required;
    copyright: Attribute.Component<'components.copyright'> & Attribute.Required;
  };
}

export interface SectionsHeader extends Schema.Component {
  collectionName: 'components_sections_headers';
  info: {
    displayName: 'Header';
    icon: 'arrow-up';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    pretitle: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    backgroundImage: Attribute.Media & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.contact': ComponentsContact;
      'components.copyright': ComponentsCopyright;
      'components.link': ComponentsLink;
      'components.social-media': ComponentsSocialMedia;
      'components.textbox': ComponentsTextbox;
      'navbar.navbar-item': NavbarNavbarItem;
      'navbar.navbar': NavbarNavbar;
      'sections.box-container': SectionsBoxContainer;
      'sections.footer': SectionsFooter;
      'sections.header': SectionsHeader;
    }
  }
}
