interface UserAuth{
    confirmed: boolean | "false" | "true",
    email: string, 
    user_id: number,
    role:string
    status:string
}
interface UserTokenAuth {
    token: string, 
    token_id: number, 
    user: UserAuth
}