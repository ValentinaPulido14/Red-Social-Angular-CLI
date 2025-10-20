/**
 * Interfaz que define la estructura de un comentario
 */

export interface Comment{
    id: string;
    postId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    likes: string[];
    createAt: Date;
    updatedAt: Date;
}

/**
 * Interfaz para crear un comentario
 */

export interface CreateComment{
    postId: string;
    content: string;
}

/**
 * Interfaz para actualizar un comentario
 */

export interface updateComment{
    content: string;
}