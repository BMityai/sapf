<template>
    <div class="users">
        <DataTable
            :value="users"
            :lazy="true"
            :paginator="true"
            :rows="20"
            v-model:filters="filters"
            ref="dt"
            :totalRecords="totalRecords"
            :loading="loading"
            @page="onPage($event)"
            @sort="onSort($event)"
            @filter="onFilter($event)"
            responsiveLayout="scroll"
        >
            <Column field="id" header="Id" ref="id" />
            <Column field="firstname" header="Имя" ref="firstname" />
            <Column field="lastname" header="Фамиллия" ref="lastname" />
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

export default defineComponent({
    components: {
        DataTable,
        Column,
    },
    async setup() {
        // Init service
        await init();
        console.log(users);

        return { users };
    },
});
</script>
