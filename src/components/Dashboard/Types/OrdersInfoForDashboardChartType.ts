export default interface OrdersInfoForDashboardChartType {
    labels: string[];
    datasets: {
        all: number[],
        completed: number[],
        canceled: number[]
    }
}