<template>
    <div class="task-box sales">
        <div class="title">Всего заказов</div>
        <div class="info">{{count}}</div>

        <i class="pi pi-chart-line"></i>
    </div>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        count: {
            type: Number,
            default: 6
        }
    },
    setup() {
        return {}
    }
})
</script>
