<template>
    <header>
        <div class="left-content">
            <div class="logo">
                <img src="@/assets/images/logo.png" alt="" />
            </div>
        </div>
        <div class="right-content">
            <div class="user">
                <Avatar class="cabinet" label="P" />
            </div>
        </div>
    </header>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import Avatar from 'primevue/avatar';


export default defineComponent({
    components: {
        Avatar
    },
    setup() {
        return {};
    },
});
</script>
