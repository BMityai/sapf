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
                    <i class="pi pi-clone" style="fontsize: 2rem"></i>
                </div>
                <div class="title">Маппинг статусов</div>
            </router-link>

            <!-- STATUSES -->
            <router-link
                :to="{ name: 'warehouses' }"
                class="item"
                :class="{ active: sidebarActiveItem === 'warehouses' }"
            >
                <div class="icon">
                    <i class="pi pi-cog" style="fontsize: 2rem"></i>
                </div>
                <div class="title">Маппинг складов</div>
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
                <div class="title" @click="logout" >
                    Выйти
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { sidebarActiveItem } from "@/app/States/PageState";
import Avatar from "primevue/avatar";
import { user, logout } from "@/app/States/AdminUserState";
import router from "@/router";


export default defineComponent({
    components: {
        Avatar,
    },
    setup() {
        const userFirstLetter = user.data.username[0];

        return { sidebarActiveItem, user, userFirstLetter, router, logout };
    },
});
</script>
