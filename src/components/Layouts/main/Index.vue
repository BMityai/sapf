<template>
    <div class="page-wrapper">
        <div id="overlay">
            <img src="@/assets/images/overlay_logo.png" class="title" alt="" />
            <ProgressBar :value="progress" />
        </div>
        <div class="page-content">
            <Sidebar />
            <div class="content">
                <h2 class="title">{{ pageTitle }}</h2>
                <router-view name="pageContent" />
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import Sidebar from "@/components/Layouts/sidebar/Index.vue";
import ProgressBar from "primevue/progressbar";
import { pageTitle } from '@/app/States/PageState'


export default defineComponent({
    components: {
        Sidebar,
        ProgressBar,
    },
    setup() {
        const progress = ref(0);
        let interval = null as any;


        onMounted(() => {
            document.querySelector("body")?.classList.add("overlay");
            startProgress();
        });

        onBeforeUnmount(() => {
            endProgress();
        });

        const startProgress = () => {
            interval = setInterval(() => {
                let newValue = progress.value + Math.floor(Math.random() * 10) + 1;
                if (newValue >= 100) {
                    newValue = 100;
                }
                progress.value = newValue;
            }, 60);
        };
        const endProgress = () => {
            clearInterval(interval);
            interval = null;
        };


        setTimeout(() => {
            document.querySelector("#overlay")?.classList.add("hide");
            document.querySelector("body")?.classList.remove("overlay");
        }, 1500);

        return { pageTitle, progress };
    },
});
</script>
