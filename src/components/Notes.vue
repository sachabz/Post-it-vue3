<script setup lang="ts">import { useNotesStore } from '@/stores/notes';

const noteStore = useNotesStore();
const notes = computed(() => noteStore.notes);


</script>

<template>
    <div>
        <Note v-for="(note, index) of notes" :key="index" :note="note" />
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