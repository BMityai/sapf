<template>
    <div class="warehouses-mapping">
        <div class="save">
            <Button
                label="Сохранить"
                class="p-button-success"
                icon="pi pi-check"
                iconPos="right"
                @click="save"
            />
        </div>
        <table>
            <thead>
                <tr>
                    <th class="crm">Склад в CRM</th>
                    <th class="kaspi">Склад в ЛК KASPI</th>
                    <th class="action"></th>
                </tr>
            </thead>
            <tbody v-for="warehouse in warehouses.form" :key="warehouse.id">
                <tr v-if="!warehouse.removed">
                    <td class="crm" :class="{invalid: warehouse.crmIsValid === false}">
                        <InputText
                            type="text"
                            v-model="warehouse.crm"
                            @change="setEditedFlag(warehouse.id)"
                        />
                    </td>
                    <td class="kaspi" :class="{invalid: warehouse.kaspiIsValid === false}">
                        <InputText
                            type="text"
                            v-model="warehouse.kaspi"
                            @change="setEditedFlag(warehouse.id)"
                            
                        />
                    </td>
                    <td class="action">
                        <Button
                            @click="removeRow(warehouse.id)"
                            icon="pi pi-trash"
                            class="p-button-raised p-button-danger"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="add-row">
            <Button
                @click="addRow"
                label="Добавить"
                icon="pi pi-plus-circle"
                iconPos="right"
            />
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { getWarehouses, warehouses, addRow, removeRow, setEditedFlag, save, setToast } from "./Service/WarehouseMappingService";
import { useToast } from "primevue/usetoast";


export default defineComponent({
    components: {
        Button,
        InputText,
    },
    async setup() {
        // Set toast
        setToast(useToast());

        // Get warehouses from backend
        await getWarehouses();

        return { warehouses, addRow, removeRow, setEditedFlag, save };
    },
});
</script>
