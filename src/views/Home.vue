
<template>
    <div class="task-boxes">
        <Sales :count = dataForTaskBoxes.allOrders />
        <NewOrders :count = dataForTaskBoxes.today />
        <CompletedOrders :count = dataForTaskBoxes.completed />
        <CanceledOrders :count = dataForTaskBoxes.canceled />
    </div>
    <Chart />
    <Orders />
    
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import Sales from "@/components/Dashboard/sales.vue";
import NewOrders from "@/components/Dashboard/new_orders.vue";
import CompletedOrders from "@/components/Dashboard/completed_orders.vue";
import CanceledOrders from "@/components/Dashboard/canceled_orders.vue";
import Orders from "@/components/Dashboard/orders.vue";
import Chart from "@/components/Dashboard/chart.vue";
import {
    init,
    dataForTaskBoxes,
} from "@/components/Dashboard/Services/DashboardService";

export default defineComponent({
    components: {
        Sales,
        NewOrders,
        CompletedOrders,
        CanceledOrders,
        Chart,
        Orders
    },
    setup() {
        // Init service
        init();
        return { dataForTaskBoxes };
    },
});
</script>
