<script setup lang="ts">
import type { Note } from '@/models/note';
import { useNotesStore } from '@/stores/notes';
import {
    Delete,
    InfoFilled
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
                    <!-- <span>{{ note.title }}</span> -->
                    <el-input class="no-border" :model-value="note.title" @update:model-value="updateTitle"
                        placeholder="titre" />

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


                    <!-- <el-button class="button" type="text" @click="deleteNote">
                        <el-icon>
                            <delete />
                        </el-icon>
                    </el-button> -->
                </div>
            </template>
            <!-- <div v-for="(row, index) of note.lines" :key="index" class="text item">{{ row }}</div> -->
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