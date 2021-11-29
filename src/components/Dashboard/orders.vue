<template>
    <div class="main_orders">
        <h2>Заказы</h2>
        <DataTable
            :value="orders"
            :lazy="true"
            class="p-datatable-sm"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :rowHover="true"
            v-model:filters="filters"
            :globalFilterFields="['orderNumber']"
            ref="dt"
            v-model:expandedRows="expandedRows"
            :totalRecords="totalRecords"
            :loading="loading"
            @page="onPage($event)"
            @sort="onSort($event)"
            @filter="onFilter($event)"
            responsiveLayout="scroll"
        >
            <template #header>
                <div class="p-d-flex p-jc-between">
                    <Button
                        type="button"
                        icon="pi pi-filter-slash"
                        label="Сбросить"
                        class="p-button-outlined"
                        @click="clearFilter()"
                    />
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText
                            v-model="filters['global'].value"
                            placeholder="Номер заказа"
                            @keydown.enter="onFilter($event)"
                        />
                    </span>
                </div>
            </template>
            <Column :expander="true" headerStyle="width: 3rem" />

            <Column
                field="orderNumber"
                header="Номер"
                filterMatchMode="contains"
                ref="orderNumber"
                :sortable="true"
            />
            <Column
                field="kaspiStatus"
                header="Статус (kaspi)"
                filterField="kaspiStatus"
                filterMatchMode="startsWith"
                ref="kaspiStatus"
                :sortable="true"
            />
            <Column
                field="crmStatus"
                header="Статус (crm)"
                filterMatchMode="startsWith"
                ref="crmStatus"
                :sortable="true"
            />
            <Column
                field="createdAt"
                header="Создан"
                filterField="createdAt"
                ref="createdAt"
                :sortable="true"
            />
            <Column
                field="updatedAt"
                header="Обновлен"
                filterField="updatedAt"
                ref="updatedAt"
                :sortable="true"
            />
            <template #expansion="slotProps">
                <div class="orders-subtable">
                    <h3>
                        Detailed order information
                        {{ slotProps.data.orderNumber }}
                    </h3>
                    <div class="isExpress">
                        <p>
                            <b>Is express: </b>
                            <span>{{ slotProps.data.data.isExpress }}</span>
                        </p>
                    </div>
                    <h4>Products</h4>
                    <DataTable
                        :value="slotProps.data.data.products"
                        responsiveLayout="scroll"
                    >
                        <Column field="name" header="name"></Column>
                        <Column field="xmlId" header="xmlId"></Column>
                        <Column field="qty" header="qty"></Column>
                        <Column field="price" header="price" />
                    </DataTable>

                    <div class="log">
                        <h4>Log</h4>
                        <pre
                            v-for="[index, perLog] in Object.entries(
                                slotProps.data.data.log
                            )"
                            :key="index"
                            >{{ perLog }}</pre
                        >
                    </div>
                    <div class="export_data">
                        <h4>Exported data to crm</h4>
                        <pre>{{ slotProps.data.data.exportedToCrmData }}</pre>
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import {
    dt,
    loading,
    totalRecords,
    orders,
    filters,
    lazyParams,
    onPage,
    onSort,
    onFilter,
    loadLazyData,
} from "./Services/DashboardService";

export default defineComponent({
    components: {
        DataTable,
        Column,
        InputText,
        Button,
    },
    setup() {
        const expandedRows = ref([]);

        onMounted(async () => {
            loading.value = true;

            lazyParams.value = ref({
                first: 0,
                rows: dt.value.rows,
                sortField: null,
                sortOrder: null,
                filters: filters.value,
            });
            await loadLazyData();
        });


        const clearFilter = async() => {
            filters.value['global'].value = null;
            await loadLazyData();
        };

        return {
            dt,
            loading,
            totalRecords,
            orders,
            filters,
            lazyParams,
            loadLazyData,
            onPage,
            onSort,
            onFilter,
            expandedRows,
            clearFilter
        };
    },
});
</script>

<style lang="less" scoped>
.main_orders {
    .p-datatable {
        font-size: 14px;
    }
    h3 {
        font-size: 18px;
    }
    h4 {
        font-size: 16px;
    }
}
</style>
