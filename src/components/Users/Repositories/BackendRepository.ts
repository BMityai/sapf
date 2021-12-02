import BackendRepositoryClient from "@/app/Repositories/BackendRepositoryClient";
export default class BackendRepository extends BackendRepositoryClient {

    private usersUrl = 'users'
    private createUserUrl = 'user/create'
    private updateUserUrl = 'user/update'

    /**
     * Get users
     */
    public async getUsers(): Promise<any> {
        return await this.fetch(`${this.usersUrl}`, 'GET');
    }

    /**
     * Create user
     */
    public async createUser(userData: any): Promise<any> {
        return await this.fetch(`${this.createUserUrl}`, 'POST', null, userData);
    }

    /**
     * Update user
     */
    public async updateUser(userData: any): Promise<any> {
        return await this.fetch(`${this.updateUserUrl}`, 'POST', null, userData);
    }


}