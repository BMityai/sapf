<template>
    <div class="statuses-mapping">
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
                    <th class="crm">Статус в CRM</th>
                    <th class="kaspi">Статус в ЛК KASPI</th>
                    <th class="action"></th>
                </tr>
            </thead>
            <tbody v-for="status in statuses.form" :key="status.id">
                <tr v-if="!status.removed">
                    <td class="crm" :class="{invalid: status.crmIsValid === false}">
                        <InputText
                            type="text"
                            v-model="status.crm"
                            @change="setEditedFlag(status.id)"
                        />
                    </td>
                    <td class="kaspi" :class="{invalid: status.kaspiIsValid === false}">
                        <InputText
                            type="text"
                            v-model="status.kaspi"
                            @change="setEditedFlag(status.id)"
                            
                        />
                    </td>
                    <td class="action">
                        <Button
                            @click="removeRow(status.id)"
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
import { getStatuses, statuses, addRow, removeRow, setEditedFlag, save, setToast } from "./Service/StatusMappingService";
import { useToast } from "primevue/usetoast";


export default defineComponent({
    components: {
        Button,
        InputText,
    },
    async setup() {
        // Set toast
        setToast(useToast());

        // Get statuses from backend
        await getStatuses();

        return { statuses, addRow, removeRow, setEditedFlag, save };
    },
});
</script>
