import type { Schema, Struct } from '@strapi/strapi';

export interface LinksLinks extends Struct.ComponentSchema {
  collectionName: 'components_links_links';
  info: {
    description: '';
    displayName: 'Links';
    icon: 'link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiCarousel extends Struct.ComponentSchema {
  collectionName: 'components_ui_carousels';
  info: {
    displayName: 'Carousel';
    icon: 'bold';
  };
  attributes: {
    deeplink: Schema.Attribute.String;
    endDateTime: Schema.Attribute.DateTime;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    partnerId: Schema.Attribute.String;
    startDateTime: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
  };
}

export interface UiFooter extends Struct.ComponentSchema {
  collectionName: 'components_ui_footers';
  info: {
    displayName: 'Footer';
    icon: 'crop';
  };
  attributes: {
    footerImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    footerText: Schema.Attribute.RichText;
    Links: Schema.Attribute.Component<'links.links', true>;
  };
}

export interface UiImage extends Struct.ComponentSchema {
  collectionName: 'components_ui_images';
  info: {
    displayName: 'Image';
    icon: 'book';
  };
  attributes: {
    altText: Schema.Attribute.String;
    endDateTime: Schema.Attribute.DateTime;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    partnerId: Schema.Attribute.String;
    startDateTime: Schema.Attribute.DateTime;
  };
}

export interface UiText extends Struct.ComponentSchema {
  collectionName: 'components_ui_texts';
  info: {
    displayName: 'Text';
    icon: 'cup';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    endDateTime: Schema.Attribute.DateTime;
    heading: Schema.Attribute.String;
    partnerId: Schema.Attribute.String;
    startDateTime: Schema.Attribute.DateTime;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'links.links': LinksLinks;
      'ui.carousel': UiCarousel;
      'ui.footer': UiFooter;
      'ui.image': UiImage;
      'ui.text': UiText;
    }
  }
}
