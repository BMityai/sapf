<template>
    <div class="page-wrapper">
        <Header />
        <div class="page-content">
            <Sidebar />
            <div class="content">
                <router-view name="pageContent" />
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import Sidebar from "@/components/Layouts/sidebar/Index.vue";
import Header from "@/components/Layouts/header/Index.vue";
export default defineComponent({
    components: {
        Header,
        Sidebar,
    },
    setup() {
        return {};
    },
});
</script>
