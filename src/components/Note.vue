<script setup lang="ts">
import type { Note } from '@/models/note';
import { useCssVar } from '@vueuse/core';
import { useNotesStore } from '@/stores/notes';
import {
    Delete,
    InfoFilled,
    Edit,
    StarFilled
} from '@element-plus/icons-vue'
import { throttle } from 'lodash';

interface Props {
    note: Note;
}
const props = defineProps<Props>();
const noteStore = useNotesStore();

//Use props into JS
const { note } = toRefs(props);

//Draggable Note
// const draggable = ref<typeof ElCard | null>(null);
const draggable = ref<HTMLElement | null>(null);
const { x, y, style } = useDraggable(draggable, {
    initialValue: { x: note.value.position.x, y: note.value.position.y },
})

//SaveNotes
const saveNote = throttle(() => {
    noteStore.saveNotes();
}, 2000, { leading: true, trailing: true })

//Update Note
const updateTitle = (value: string) => {
    noteStore.updateNote(note.value.id, value);
    saveNote();
}
const updateRow = (value: string, index: number) => {
    const rows = [...note.value.lines.slice(undefined, index), value, ...note.value.lines.slice(index + 1)];
    noteStore.updateNote(note.value.id, undefined, rows);
    saveNote();
}
watch([x, y], () => {
    noteStore.updateNotePosition(note.value.id, { x: x.value, y: y.value })
    saveNote();
})
//Update color Note
const colorsNote = [
    { text: "Bleu", value: { color: "#2196f3", complementary: "#f36e21", monochromatique: "#4a99da" } },
    { text: "Rouge", value: { color: "#CF4D10", complementary: "#1099cf", monochromatique: "#b65c33" } },
    { text: "Jaune", value: { color: "#c69d25", complementary: "#7325c6", monochromatique: "#ad9343" } },
    { text: "Violet", value: { color: "#7964c9", complementary: "#c9a164", monochromatique: "#857bb0" } },
    { text: "Vert d'eau", value: { color: "#aaccaa", complementary: "#c9a164", monochromatique: "#857bb0" } },
    { text: "Vert", value: { color: "#7f965d", complementary: "#965d7f", monochromatique: "#607d34" } },
    { text: "Orange", value: { color: "#E87700", complementary: "#0800e8", monochromatique: "#cf7f29" } },
    { text: "Rose", value: { color: "#C800AD", complementary: "#adc800", monochromatique: "#af239c" } },
    { text: "Acajou", value: { color: "#88421d", complementary: "#1d5f88", monochromatique: "#6f452e" } },
    { text: "Auburn", value: { color: "#622725", complementary: "#25622d", monochromatique: "#7c4947" } },
    { text: "Bronze", value: { color: "#614e1a", complementary: "#3b1a61", monochromatique: "#7b6a39" } },
]
const updateColorNote = (selection) => {
    console.log(selection)
}
//Delete Note
const deleteNote = () => {
    const idInterger = Number(note.value.id);
    noteStore.deleteNote(idInterger);
    saveNote();
}
const cancelEvent = () => {
    console.log('cancel!')
}



</script>

<template>
    <div ref="draggable" :style="style" style="position: fixed; z-index:10; user-select: none; cursor: move;">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <el-input class="no-border" :model-value="note.title" @update:model-value="updateTitle"
                        placeholder="titre" />

                    <!-- Update color note -->
                    <el-dropdown trigger="click">
                        <el-button class="button" type="text">
                            <el-icon color="danger">
                                <edit />
                            </el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu @command="updateColorNote">
                                <el-dropdown-item v-for="(color, index) of colorsNote" :key="index">
                                    <el-icon :color="color.value.color">
                                        <star-filled />
                                    </el-icon>{{ color.text }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                    <!-- Delete note -->
                    <el-popconfirm confirm-button-text="Oui" @confirm="deleteNote" cancel-button-text="Non, Merci"
                        @cancel="cancelEvent" :icon="InfoFilled" icon-color="red"
                        title="Êtes vous sûre de vouloir supprimer?">
                        <template #reference>
                            <el-button class="button" type="text">
                                <el-icon color="danger">
                                    <delete />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </template>

            <!-- Note list -->
            <div v-for="(row, index) of note.lines" :key="index" class="text item">
                <el-input class="no-border" :model-value="row" @update:model-value="updateRow($event, index)"
                    placeholder="titre" />
            </div>

        </el-card>
    </div>

</template>

<style scoped lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}

.no-border {
    --el-input-border-color: transparent;
}
</style>