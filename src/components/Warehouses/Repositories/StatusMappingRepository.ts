import BackendRepositoryClient from "@/app/Repositories/BackendRepositoryClient";
export default class StatusMappingRepository extends BackendRepositoryClient {

    private statusesUrm = 'statuses'

    /**
     * Auth user
     */
    public async getStatuses(): Promise<any> {
        return await this.fetch(`${this.statusesUrm}`, 'GET');
    }

    /**
     * Auth user
     */
    public async submitStatusMappingForm(statuses: any): Promise<any> {
        return await this.fetch(`${this.statusesUrm}`, 'POST', null, statuses);
    }
}