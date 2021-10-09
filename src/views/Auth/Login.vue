<template>
    <AuthForm />
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import AuthForm from "@/components/Auth/Form.vue";

export default defineComponent({
    components: {
        AuthForm,
    },
    setup() {
        return {};
    },
});
</script>
