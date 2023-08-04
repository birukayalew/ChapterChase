export interface IRegisterUser {
    address: string;
    email: string;
    gender: string;
    name: string;
    password: string;
    phone: number;
    role: string;
    img?: string;
    confirm?: string;
    photoURL?: string;
}

export interface IAddBook {
    book_name: string;
    genre: string;
    img: string;
    description: string;
    author_name: string | null;
    author_email: string | null;
    author_img: string | null;
    reviews: [];
    publish_date: string;
}

export interface IBOok {
    _id?: string | null;
    book_name?: string | null;
    genre?: string | null;
    img?: string | null;
    description?: string;
    author_name?: string | null;
    author_email?: string | null;
    author_img?: string | null;
    reviews?: [];
    publish_date?: string | null;
}
