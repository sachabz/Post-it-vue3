export const useNotesStore = defineStore({
    id: "note",
    state: () => ({
        rows: [
            title: "Projet 1",
            rows: [
                { content: "liste 1" }
                { content: "liste 2" }
            ]
        ]
    }),
    getters: {

    },
    actions: {
        updateRow(title: string, content: string) {
            const table = this.rows.find((element) => element.title === title);
            const row = table?.rows.find((element) => element.content === content);
            if (row !== undefined) {
                row.content = content;
            }
        }
    }
})