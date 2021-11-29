<template>
    <div class="task-box new-orders">
        <div class="title">За сегодня</div>
        <div class="info">{{ count }}</div>

        <i class="pi pi-shopping-cart"></i>
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