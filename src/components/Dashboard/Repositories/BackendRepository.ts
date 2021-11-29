import BackendRepositoryClient from "@/app/Repositories/BackendRepositoryClient";
import AllOrdersInfoForDashboardTaskBoxType from "../Types/AllOrdersInfoForDashboardTaskBoxType";
import OrdersInfoForDashboardChartType from "../Types/OrdersInfoForDashboardChartType";



export default class BackendRepository extends BackendRepositoryClient {

    private DASHBOARD_ALL_ORDERS_INFO = 'dashboard/info_all'
    private DASHBOARD_INFO_FOR_THE_YEAR = 'dashboard/info_year'
    private DASHBOARD_ORDERS = 'dashboard/orders'

    /**
     * Get all orders info
     */
    public async getAllOrdersInfo(): Promise<AllOrdersInfoForDashboardTaskBoxType> {
        return await this.fetch(`${this.DASHBOARD_ALL_ORDERS_INFO}`, 'GET');
    }

    /**
     * Get orders info for the year
     */
    public async getInfoForTheYear(): Promise<OrdersInfoForDashboardChartType> {
        return await this.fetch(`${this.DASHBOARD_INFO_FOR_THE_YEAR}`, 'GET');
    }

    /**
     * Get orders info for the year
     */
    public async getOrders(): Promise<any> {
        return await this.fetch(`${this.DASHBOARD_ORDERS}`, 'GET');
    }

}