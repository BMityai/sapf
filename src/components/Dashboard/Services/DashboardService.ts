
import BackendRepository from "../Repositories/BackendRepository";
import { ref } from 'vue';

const repository = new BackendRepository();

// Default (empty) data for dashboard task box
const dataForTaskBoxes = ref({
    allOrders: 0,
    today: 0,
    completed: 0,
    canceled: 0
});

// Default (empty) data for dashboard chart
const chartData = ref({
    labels: [] as string[],
    datasets: [
        {
            label: "Всего",
            data: [] as number[],
            fill: false,
            tension: 0.4,
            borderColor: "#eeca02",
            backgroundColor: "#eedc7a87",

        },
        {
            label: "Успешно завершенные",
            data: [] as number[],
            fill: true,
            tension: 0.4,
            borderColor: "#23e686",
            backgroundColor: "#5ff6ac66",

        },
        {
            label: "Отмененные",
            data: [] as number[],
            fill: true,
            borderColor: "#ff3e3e",
            tension: 0.4,
            backgroundColor: "#ff3e3ec4",
        },

    ],
});

// Init data table
const dt = ref();

// Show table preloader
const loading = ref(false);

// Order total records
const totalRecords = ref(0);

// Orders
const orders = ref();

// lazyParams
const lazyParams = ref();

// init table filters
const filters = ref({
    'global': { value: null, matchMode: 'contains' }
});



/**
 * Init service
 */
const init = async (): Promise<void> => {
    await Promise.allSettled([getAllOrdersInfo(), getInfoForChart()]);
}

/**
 * Get info for task boxes
 */
const getAllOrdersInfo = async (): Promise<void> => {
    dataForTaskBoxes.value = await repository.getAllOrdersInfo();
}

/**
 * Get info for chart
 */
const getInfoForChart = async (): Promise<void> => {
    const data = await repository.getInfoForTheYear();
    chartData.value.labels = data.labels;
    chartData.value.datasets[0].data = data.datasets.all;
    chartData.value.datasets[1].data = data.datasets.completed;
    chartData.value.datasets[2].data = data.datasets.canceled;
}

/**
 * Handle onPage event
 */
const onPage = (event: any): void => {
    lazyParams.value = event;
    loadLazyData();
};

/**
 * Handle onSort event
 */
const onSort = (event: any): void => {
    lazyParams.value = event;
    loadLazyData();
};

/**
 * Handle onFilter event
 */
const onFilter = (): void => {
    lazyParams.value.filters = filters.value;
    loadLazyData();
}

/**
 * Get data from backend
 */
const loadLazyData = async (): Promise<void> => {

    console.log(JSON.stringify(lazyParams.value)) // параметры для сортировки
    loading.value = true;

    const ordersDataFromBackend = await repository.getOrders();
    orders.value = ordersDataFromBackend.orders;
    totalRecords.value = ordersDataFromBackend.totalRecords;
    loading.value = false;
};



export { init, chartData, dataForTaskBoxes, dt, loading, totalRecords, orders, filters, lazyParams, onPage, onSort, onFilter, loadLazyData }

