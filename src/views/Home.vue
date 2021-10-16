<template>
    <div class="task-boxes">
        <Sales/>
        <NewOrders/>
        <CompletedOrders/>
        <CanceledOrders/>
    </div>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Sales from '@/components/Layouts/dashboard/sales.vue'
import NewOrders from '@/components/Layouts/dashboard/new_orders.vue'
import CompletedOrders from '@/components/Layouts/dashboard/completed_orders.vue'
import CanceledOrders from '@/components/Layouts/dashboard/canceled_orders.vue'
export default defineComponent({
    components: {
        Sales,
        NewOrders,
        CompletedOrders,
        CanceledOrders,
    },
    setup() {
        return {}
    },
})
</script>
