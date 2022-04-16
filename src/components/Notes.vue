<script setup lang="ts">
const notes = [];
</script>

<template>

    <Note title="Hello"></Note>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
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