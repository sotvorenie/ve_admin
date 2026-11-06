import {UserWithToken} from "@/types/user.ts";

import {AuthService} from "@api/auth/AuthService.ts";

import useUserStore from "@store/useUserStore.ts";

export const logIn = (data: UserWithToken): void => {
    const userStore = useUserStore();

    localStorage.setItem("token", data.token)
    userStore.user = data.user
    userStore.token = data.token
    userStore.isLogged = true
}

export const logOut = (): void => {
    const userStore = useUserStore();

    localStorage.removeItem('token')
    userStore.clear()
}

export const getMe = async (): Promise<void> => {
    const userStore = useUserStore();

    const token: string = localStorage.getItem("token") || ''
    if (!token) {
        userStore.isLogged = false
        return
    }

    try {
        const data = await AuthService.getMe()
        if (data.token) logIn(data)
    } catch {
        userStore.isLogged = false
    }
}