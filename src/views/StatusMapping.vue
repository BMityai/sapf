<template>
    <Suspense>
        <Statuses />
    </Suspense>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import Statuses from "@/components/Statuses/Index.vue";

export default defineComponent({
    components: {
        Statuses,
    },
    setup() {
        return {};
    },
});
</script>
