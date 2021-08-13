import {Configuration, ContactRequestsApi, HeaderApi, LandingApi} from '../.openapi';
import {BASE_PATH}                                                from '../.openapi/base';


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

    getImageURL(image: object): string {
        // @ts-ignore
        return this.configuration.basePath + image.url;
    }

    getHeaderApi(): HeaderApi {
        return new HeaderApi(this.configuration);
    }

    getLandingApi(): LandingApi {
        return new LandingApi(this.configuration);
    }

    getContactRequestsApi(): ContactRequestsApi {
        return new ContactRequestsApi(this.configuration);
    }
}

export default ApiFactory;
