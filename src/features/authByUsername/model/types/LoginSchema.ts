export interface LoginSchema{
    username: string,
    password: string,
    isLoading:boolean // while send request to backend server
    error?:string // if we have some error
}