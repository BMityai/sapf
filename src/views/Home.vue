
<template>
    <div class="task-boxes">
        <Sales :count="dataForTaskBoxes.allOrders" />
        <NewOrders :count="dataForTaskBoxes.today" />
        <CompletedOrders :count="dataForTaskBoxes.completed" />
        <CanceledOrders :count="dataForTaskBoxes.canceled" />
    </div>
    <Suspense>
        <!-- <template #default> -->
            <Chart />
        <!-- </template>
        <template #fallback> 
            <Skeleton style="padding-bottom:50%; margin-top:30px" width="100%"/>    
        </template> -->
    </Suspense>

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
    getAllOrdersInfo,
    dataForTaskBoxes,
} from "@/components/Dashboard/Services/DashboardService";
// import Skeleton from 'primevue/skeleton';

export default defineComponent({
    components: {
        Sales,
        NewOrders,
        CompletedOrders,
        CanceledOrders,
        Chart,
        // Skeleton,
        Orders,
    },
    setup() {
        // Init info
        getAllOrdersInfo();
        return { dataForTaskBoxes };
    },
});
</script>
