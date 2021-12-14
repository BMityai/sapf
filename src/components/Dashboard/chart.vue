<template>
    <div class="main_chart">
        <div class="preloader" v-if="showChartPleloader">
            <i class="pi pi-spin pi-spinner" style="fontsize: 2rem"></i>
        </div>
        <Chart
            ref="primeChart"
            type="line"
            :data="chartData"
            :options="basicOptions"
        />
    </div>
</template>
<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
import Chart from "primevue/chart";
import { getInfoForChart, chartData } from "./Services/DashboardService";

export default defineComponent({
    components: {
        Chart,
    },
    async setup() {
        const primeChart = ref();
        const showChartPleloader = ref(true);

        watch(chartData.value, () => {
            showChartPleloader.value = false;
            const chart = primeChart.value;
            chart.refresh();
        });

        getInfoForChart();

        const basicOptions = ref({
            plugins: {
                legend: {
                    labels: {
                        color: "#495057",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        });

        return { chartData, basicOptions, primeChart, showChartPleloader };
    },
});
</script>
<style scoped lang='less'>
.main_chart {
    margin-top: 30px;
    overflow: hidden;
    .preloader {
        .pi-spinner {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 73px;
            z-index: 1;
        }
    }
}
</style>
