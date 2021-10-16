<template>
    <div class="sidebar-content">
        <div class="logo">
            <img class="image" src="@/assets/images/logo.png" alt="" />
            <img src="@/assets/images/logo_title.png" class="title" alt="" />
        </div>
        <div class="items">
            <!-- DASHBOARD -->
            <router-link
                :to="{ name: 'home' }"
                class="item"
                :class="{ active: sidebarActiveItem === 'home' }"
            >
                <div class="icon">
                    <i class="pi pi-desktop" style="fontsize: 2rem"></i>
                </div>
                <div class="title">Заказы</div>
            </router-link>

            <!-- STATUSES -->
            <router-link
                :to="{ name: 'statuses' }"
                class="item"
                :class="{ active: sidebarActiveItem === 'statuses' }"
            >
                <div class="icon">
                    <i class="pi pi-cog" style="fontsize: 2rem"></i>
                </div>
                <div class="title">Маппинг</div>
            </router-link>

            <!-- USER -->
            <router-link
                :to="{ name: 'users' }"
                class="item"
                :class="{ active: sidebarActiveItem === 'users' }"
            >
                <div class="icon">
                    <i class="pi pi-user" style="fontsize: 2rem"></i>
                </div>
                <div class="title">Пользователи</div>
            </router-link>
        </div>
        <div class="account">
            <div class="icon">
                <Avatar @click="router.push({name: 'account'})" :label="userFirstLetter" class="p-mr-2" size="large" style="background-color:#2196F3; color: #ffffff"/>
                <div class="title">
                    Выйти
                </div>

                <OverlayPanel
                    ref="op"
                    appendTo="body"
                    :showCloseIcon="true"
                    id="overlay_panel"
                    style="width: 450px"
                    :breakpoints="{ '960px': '75vw' }"
                >
                    555555555555 44444 55555 22222222
                </OverlayPanel>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { sidebarActiveItem } from "@/app/States/PageState";
import OverlayPanel from "primevue/overlaypanel";
import Avatar from "primevue/avatar";
import { user } from "@/app/States/AdminUserState";
import router from "@/router";


export default defineComponent({
    components: {
        OverlayPanel,
        Avatar,
    },
    setup() {
        const op = ref();

        const toggle = (event: any) => {
            op.value.toggle(event);
        };

        const userFirstLetter = user.data.username[0];
        console.log(userFirstLetter);

        return { sidebarActiveItem, op, toggle, user, userFirstLetter, router };
    },
});
</script>
