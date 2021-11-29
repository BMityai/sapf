<template>
    <div class="main_chart">
        <Chart type="line" :data="chartData" :options="basicOptions" />
    </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from "vue";
import Chart from "primevue/chart";
import { chartData } from "./Services/DashboardService";


export default defineComponent({
    components: {
        Chart,
    },
    setup() {
        

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

        return { chartData, basicOptions };
    },
});
</script>
<style scoped lang='less'>
.main_chart {
    margin-top: 30px;
    overflow: hidden;
}
</style>
