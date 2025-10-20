/*
*Interfaz que define la estructura de un usuario
*/ 

export interface User{
    id: String;
    username: string;
    email: string;
    password?: string;
    fullname: string;
    bio?: string;
    avatar: string;
    converPhoto?: string;
    followers: string[];
    following: string[];
    createdAt: Date;
    updatedAt: Date;
}

/*
*Interfaz para el registro de nuevos usuarios
*/ 

export interface UserRegistration{
    username: string;
    email: string;
    password?: string;
    fullname: string;
}

export interface UserUpdate{
    fullname?: string;
    bio?: string;
    avatar?: string;
    converPhoto?: string;
}

/*
*Interfaz que define la estructura de una publicacion
*/ 

export interface Post{
    id: string;
    userId: string;
    userName: string;
    content: string;
    userAvatar: string;
    image?: string;
    likes: string[];
    commentCount: number;
    createdAt: Date;
    updatedAt?: Date;
}

/*
*Interfaz para crear una nueva publicacion
*/ 

export interface CreatePost{
    content?: string;
    image?: string;
}

/*
*Interfaz para actualizar una publicacion
*/ 

export interface CreatePost{
    content?: string;
    image?: string;
}