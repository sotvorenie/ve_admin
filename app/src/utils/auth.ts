import useUserStore from "../store/useUserStore.ts";
import {apiCheckMe} from "../api/auth/auth.ts";
import {UserWithToken} from "../types/user.ts";

export const login = (data: UserWithToken): void => {
    const userStore = useUserStore();

    localStorage.setItem("token", data.token)
    userStore.user = data.user
    userStore.token = data.token
    userStore.isLogged = true
}

export const logout = (): void => {
    const userStore = useUserStore();

    localStorage.removeItem('token')
    userStore.clear()
}

export const checkMe = async (): Promise<void> => {
    const userStore = useUserStore();

    const token: string = localStorage.getItem("token") || ''
    if (!token) {
        userStore.isLogged = false
        return
    }

    try {
        const data: UserWithToken = await apiCheckMe()
        login(data)
    } catch (err) {
        console.error(err)
        userStore.isLogged = false
    }
}