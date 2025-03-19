export type TodoObject = {
    id: string;
    title: string;
    completed: boolean;
}

export type TodoList = TodoObject[]

export type UserProfile = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
}
