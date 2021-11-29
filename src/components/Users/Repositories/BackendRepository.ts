import BackendRepositoryClient from "@/app/Repositories/BackendRepositoryClient";
export default class BackendRepository extends BackendRepositoryClient {

    private usersUrl = 'users'

    /**
     * Get users
     */
    public async getUsers(): Promise<any> {
        return await this.fetch(`${this.usersUrl}`, 'GET');
    }
}