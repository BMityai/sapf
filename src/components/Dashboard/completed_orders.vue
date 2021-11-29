<template>
    <div class="task-box completed-orders">
        <div class="title">Завершенных</div>
        <div class="info">{{ count }}</div>
        <i class="pi pi-check-circle"></i>
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