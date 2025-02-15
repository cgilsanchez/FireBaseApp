export interface Receta {
    id?: string;
    titulo: string;
    ingredientes: string[];
    descripcion: string;
    chefId: string;
    imagenUrl?: string;
    favorito?: boolean;
}
