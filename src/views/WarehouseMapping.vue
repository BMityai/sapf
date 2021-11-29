<template>
    <Suspense>
        <Warehouses />
    </Suspense>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import Warehouses from "@/components/Warehouses/Index.vue";

export default defineComponent({
    components: {
        Warehouses,
    },
    setup() {
        return {};
    },
});
</script>
