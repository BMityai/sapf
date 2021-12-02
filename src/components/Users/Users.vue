<template>
    <div class="users">
        <div class="action">
            <Button label="Добавить пользователя" class="p-button-success" @click.prevent="router.push({ name: 'users.create' })" />
        </div>
        <DataTable
            :value="users"
            :paginator="true"
            :rows="10"
            :rowsPerPageOptions="[10,20,50]"
            ref="dt"
            responsiveLayout="scroll"
        >
            <Column field="id" header="Id" ref="id" />
            <Column field="firstname" header="Имя" ref="firstname" />
            <Column field="lastname" header="Фамилия" ref="lastname" />
            <Column field="username" header="Логин" ref="username" />
            <Column field="email" header="Email" ref="email" />
            <Column field="createdAt" header="Создан" ref="createdAt" />
        </DataTable>
    </div>

</template>

<script lang='ts'>
import { defineComponent } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { init, users } from "./Service/AdminUsersService";
import Button from 'primevue/button';
import router from "@/router";

export default defineComponent({
    components: {
        DataTable,
        Column,
        Button
    },
    async setup() {
        // Init service
        await init();

        return { users, router };
    },
});
</script>
