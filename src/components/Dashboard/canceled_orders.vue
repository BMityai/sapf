<template>
    <div class="task-box canceled-orders">
        <div class="title">Отмененных</div>
        <div class="info">{{ count }}</div>

        <i class="pi pi-trash"></i>
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