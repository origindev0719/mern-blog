export interface IProduct {
    _id?: string
    id?: string
    name: string
    description: string
    quantity: number    
    price: number
}

export interface ICart {
    id?: string
    count: number
}

export interface User {
    id?: string
    password: string
    email: string
    name?: string
}

export interface Blog {
    title: string
    description: string
    category: string
    date: string
    img: string
    comment_count: Number
}

export interface BlogComment {
    title: string
    description: string
    category: string
    date: string
    img: string
    _id: string
    comment_count: Number
    user_id: string
}

export interface Comment {
    email: string
    name: string
    message?: string
    blog_id: string
}