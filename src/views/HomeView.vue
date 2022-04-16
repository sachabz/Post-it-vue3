<script setup lang="ts">
import { useNotesStore } from '@/stores/notes';
import {
  Delete,
  Plus
} from '@element-plus/icons-vue'

const noteStore = useNotesStore();

const addNote = () => {
  noteStore.createNote();
}

const saveNotes = () => {
  noteStore.saveNotes();
}

const loadNotes = () => {
  noteStore.loadNotes();
}
</script>

<template>
  <main>
    <el-button type="info" :icon="Plus" circle @click="addNote" />
    <el-button type="danger" :icon="Plus" @click="saveNotes">save</el-button>
    <el-button type="success" :icon="Plus" @click="loadNotes">load</el-button>
    <Notes />
  </main>
</template>
