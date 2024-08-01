import type { Imprimivel } from "../utils/imprimivel.js";
import type { Comparavel } from "./comparavel.js";

export interface Modelo<T> extends Imprimivel, Comparavel<T> {}
