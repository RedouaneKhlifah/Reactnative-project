interface UserAuth{
    confirmed: boolean,
    email: string, 
    user_id: number
}
interface UserTokenAuth {
    token: string, 
    token_id: number, 
    user: UserAuth
}