<template>
    <suspense>
        <Users />
    </suspense>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import Users from "@/components/Users/Users.vue";

export default defineComponent({
    components: {
        Users,
    },
    setup() {
        return {};
    },
});
</script>
