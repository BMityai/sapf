<template>
    <Toast position="top-right" />

    <router-view />
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import Toast from "primevue/toast";

export default defineComponent({
    components: {
        Toast,
    },
    setup() {
        return {};
    },
});
</script>

