import Cookies from 'universal-cookie';
import {
    Configuration,
    ContactRequestApi,
    I18nLocaleApi,
    LandingPageApi,
    MasterDataApi,
    ProjectApi,
    ProjectPageApi
} from '../.openapi';
import {BASE_PATH} from '../.openapi/base';
import type {AxiosRequestConfig} from 'axios';


let instance: ApiFactory | null = null;

interface ImageAttributes {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider_metadata: any;
    folderPath: string;
    createdAt: string;
    updatedAt: string;
}

interface APIParameters {
    sort?: string,
    paginationWithCount?: boolean,
    paginationPage?: number,
    paginationPageSize?: number,
    paginationStart?: number,
    paginationLimit?: number,
    fields?: string,
    populate?: string,
    filters?: object,
    locale?: string,
    options?: AxiosRequestConfig
}

export interface Image {
    id: number,
    attributes: ImageAttributes
}

class ApiFactory {
    configuration: Configuration = new Configuration({
        basePath: BASE_PATH.replace('http://localhost:1337', globalConfig.serverUrl),
        apiKey: process.env.REACT_APP_API_TOKEN
    });

    static getInstance(): ApiFactory {
        if (!instance) {
            instance = new ApiFactory();
        }
        return instance;
    }

    static getLocale(): string {
        const cookies = new Cookies();
        return cookies.get('locale') || navigator.language.split('-')[0] || 'en';
    }

    static getAPIParameters(): APIParameters {
        return {
            locale: ApiFactory.getLocale(),
            populate: 'deep'
        }
    }

    getImageURL(image: Image): string {
        return globalConfig.serverUrl + image.attributes.url;
    }

    getMasterDataApi(): MasterDataApi {
        return new MasterDataApi(this.configuration);
    }

    getLandingPageApi(): LandingPageApi {
        return new LandingPageApi(this.configuration);
    }

    getProjectPageApi(): ProjectPageApi {
        return new ProjectPageApi(this.configuration);
    }

    getContactRequestsApi(): ContactRequestApi {
        return new ContactRequestApi(this.configuration);
    }

    getProjectApi(): ProjectApi {
        return new ProjectApi(this.configuration);
    }

    getLocaleApi(): I18nLocaleApi {
        return new I18nLocaleApi(this.configuration);
    }
}

export default ApiFactory;
