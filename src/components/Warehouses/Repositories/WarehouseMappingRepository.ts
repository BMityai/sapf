import BackendRepositoryClient from "@/app/Repositories/BackendRepositoryClient";
export default class WarehouseMappingRepository extends BackendRepositoryClient {

    private warehousesUrl = 'warehouses';

    /**
     * Auth user
     */
    public async getWarehouses(): Promise<any> {
        return await this.fetch(`${this.warehousesUrl}`, 'GET');
    }

    /**
     * Auth user
     */
    public async submitWarehouseMappingForm(warehouses: any): Promise<any> {
        return await this.fetch(`${this.warehousesUrl}`, 'POST', null, warehouses);
    }
}