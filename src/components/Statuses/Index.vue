<template>
    <div class="statuses-mapping">
        <div class="save">
            <Button
                label="Сохранить"
                class="p-button-success"
                icon="pi pi-check"
                iconPos="right"
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
            <tbody v-for="t in test" :key="t.id">
                <tr v-if="!t.removed">
                    <td class="crm">
                        <InputText
                            type="text"
                            v-model="t.crm"
                            @change="setEditedFlag(t.id)"
                        />
                    </td>
                    <td class="kaspi">
                        <InputText
                            type="text"
                            v-model="t.kaspi"
                            @change="setEditedFlag(t.id)"
                        />
                    </td>
                    <td class="action">
                        <Button
                            @click="removeRow(t.id)"
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
import { defineComponent, ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default defineComponent({
    components: {
        Button,
        InputText,
    },
    setup() {
        const addRow = () => {
            const emptyField = {
                id: `new-${Date.now()}`,
                crm: "",
                kaspi: "",
                new: true,
            };
            test.value.push(emptyField);
            console.log(test.value);
        };

        const removeRow = (id: any) => {
            for (const item of test.value) {
                if (item.id !== id) continue;
                item.removed = true;
            }
        };

        const setEditedFlag = (id: any) => {
            for (const item of test.value) {
                if (item.id !== id) continue;
                item.edited = true;
            }
        };

        const test = ref();
        test.value = [
            { id: 1, crm: "testCrm1", kaspi: "testKaspi1" },
            { id: 2, crm: "testCrm2", kaspi: "testKaspi2" },
            { id: 3, crm: "testCrm3", kaspi: "testKaspi3" },
            { id: 4, crm: "testCrm4", kaspi: "testKaspi4" },
            { id: 5, crm: "testCrm5", kaspi: "testKaspi5" },
        ];

        return { test, addRow, removeRow, setEditedFlag };
    },
});
</script>
