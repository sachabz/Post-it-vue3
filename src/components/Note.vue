<script setup lang="ts">
interface Row {
    content: string;
}
interface Props {
    title?: String;
    rows?: Row[];
}
const props = withDefaults(defineProps<Props>(), {
    title: "Titre",
    rows: () => ["liste 1", "liste 2"],
});

//Draggable Note
const draggable = ref<HTMLElement | null>(null);
const { x, y, style } = useDraggable(draggable, {
    initialValue: { x: 40, y: 40 },
})

//Use props into JS
const { rows, title } = toRefs(props);

//Update Note

</script>

<template>
    <div ref="draggable" :style="style" style="position: fixed; z-index:10; user-select: none; cursor: move;">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>{{ title }}</span>
                    <el-button class="button" type="text">
                        <!-- <el-icon>
                            <edit />
                        </el-icon> -->
                        Update
                    </el-button>
                </div>
            </template>
            <div v-for="(row, index) of rows" :key="index" class="text item">{{ row.content }}</div>
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