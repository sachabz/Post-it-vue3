<script setup lang="ts">
import type { Note } from '@/models/note';
import { useNotesStore } from '@/stores/notes';
import {
    Edit
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
}, 2000)

//Update Note
const updateTitle = () => {
    noteStore.updateNote(note.value.id)
}
watch([x, y], () => {
    noteStore.updateNotePosition(note.value.id, { x: x.value, y: y.value })
    saveNote();
})

</script>

<template>
    <div ref="draggable" :style="style" style="position: fixed; z-index:10; user-select: none; cursor: move;">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>{{ note.title }}</span>
                    <el-button class="button" type="text" @click="updateTitle">
                        <el-icon>
                            <edit />
                        </el-icon>

                    </el-button>
                </div>
            </template>
            <div v-for="(row, index) of note.lines" :key="index" class="text item">{{ row }}</div>
        </el-card>
    </div>

</template>

<style scoped>
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
</style>