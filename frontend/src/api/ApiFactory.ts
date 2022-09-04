import Cookies from 'universal-cookie';
import {
    Configuration, ContactRequestApi,
    MasterDataApi, LandingPageApi,
    ProjectPageApi, ProjectApi
} from '../.openapi';
import {BASE_PATH} from '../.openapi/base';


let instance: ApiFactory | null = null;

class ApiFactory {
    configuration: Configuration = new Configuration({
        basePath: BASE_PATH.replace('http://localhost:3001', globalConfig.serverUrl)
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

    getImageURL(image: Image): string {
        return this.configuration.basePath + image.url;
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
}

export default ApiFactory;
