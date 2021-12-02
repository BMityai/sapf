<template>
    <suspense>
        <CreateUser />
    </suspense>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import CreateUser from "@/components/Users/CreateUser.vue";

export default defineComponent({
    components: {
        CreateUser,
    },
    setup() {
        return {};
    },
});
</script>
