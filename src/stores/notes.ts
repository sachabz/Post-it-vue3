import type { Note } from "@/models/note";
import type { Position } from "@/models/position";
import { indexOf } from "lodash";
import { v4 as uuidv4 } from 'uuid';

export const useNotesStore = defineStore({
    id: "note",
    state: () => ({
        notes: [] as Note[]
    }),
    getters: {

    },
    actions: {
        createNote(title: string = "title", lines: string[] = ["list1", "list2"]) {
            const newNote: Note = { id: uuidv4(), title: title, lines: lines, position: { x: 0, y: 0 } };
            this.notes.push(newNote);
        },
        updateNote(id: string, title?: string, lines?: string[]) {
            const noteUpdate = this.notes.find((el) => el.id === id);
            if (noteUpdate === undefined) return;
            if (title !== undefined) noteUpdate.title = title;
            if (lines !== undefined) noteUpdate.lines = lines;
        },
        updateNotePosition(id: string, position: Position) {
            const noteUpdate = this.notes.find((el) => el.id === id);
            if (noteUpdate === undefined) return;
            noteUpdate.position = position
        },
        saveNotes() {
            localStorage.setItem('note', JSON.stringify(this.notes))
        },
        loadNotes() {
            const storedNotes = localStorage.getItem('note');
            if (storedNotes === null) return;
            const notes = JSON.parse(storedNotes);
            this.notes = notes;
        },
        deleteNote(id: string) {
            this.notes = this.notes.filter((element) => element.id !== id);
        }
    },
})