import BackendRepositoryClient from "@/app/Repositories/BackendRepositoryClient";
export default class StatusMappingRepository extends BackendRepositoryClient {

    private statusesUrl = 'statuses'

    /**
     * Auth user
     */
    public async getStatuses(): Promise<any> {
        return await this.fetch(`${this.statusesUrl}`, 'GET');
    }

    /**
     * Auth user
     */
    public async submitStatusMappingForm(statuses: any): Promise<any> {
        return await this.fetch(`${this.statusesUrl}`, 'POST', null, statuses);
    }
}