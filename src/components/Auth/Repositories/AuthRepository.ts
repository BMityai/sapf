import BackendRepositoryClient from "@/app/Repositories/BackendRepositoryClient";
export default class AuthRepository extends BackendRepositoryClient {

    private authUrl = 'auth'
    private getAdminUserUrl = 'user'

    /**
     * Auth user
     */
    public async authAdminUser(params: any): Promise<any> {
        return await this.fetch(`${this.authUrl}`, 'POST', null, params);
    }

    /**
     * Get user by jwt
     */
    public async getAdminUserByJwt(jwt: string): Promise<any> {
        return this.fetch(`${this.getAdminUserUrl}`, 'GET', { jwt })
    }
}