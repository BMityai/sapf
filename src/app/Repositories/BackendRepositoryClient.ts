import axios, { Method } from "axios";
import { useCookie } from "@vue-composable/cookie";

export default class BackendRepositoryClient {

    baseUrl: string;
    version = 'v1';

    constructor() {
        this.baseUrl = process.env.VUE_APP_BACKEND_URL + this.version;
    }

    public async fetch(path: string, method: string, params: any | null = null, body: any | null = null, headers: any = null): Promise<any> {
        const response = await axios({
            url: `${this.baseUrl}/${path}`,
            method: method as Method,
            params: params,
            data: body,
            headers: this.setAdminUserTokenToHeader(headers)
        });
        return response.data;
    }


    /**
     * Set token to header
     */
    private setAdminUserTokenToHeader(headers: any | null) {
        const { cookie } = useCookie("aToken");

        // If not set token
        if (!cookie.value || cookie.value === null) {
            return headers;
        }

        // Set token
        if (headers === null) {
            return { token: cookie.value };
        } else {
            headers.token = cookie.value;
            return headers
        }
    }
}