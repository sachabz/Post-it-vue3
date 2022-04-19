
import type { Position } from "./position";

/**
 * A post it Note
 */
export interface Note {
    id: string;
    title: string;
    lines: string[];
    position: Position;
    color: string;
}