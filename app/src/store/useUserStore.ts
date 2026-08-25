import {defineStore} from "pinia";
import {ref} from "vue";
import {User} from "@/types/user.ts";

const useUserStore = defineStore('userStore', () => {
    // данные о пользователе
    const user = ref<User>({
        id: -1,
        name: 'Sotvorenie',
        avatarUrl: '/diane.jpg',
    })

    // пользователь вошел или нет
    const isLogged = ref<boolean>(false)

    // jwt-токен
    const token = ref<string>('')

    const clear = () => {
        user.value = {
            id: -1,
            name: '',
            avatarUrl: '',
        }
        isLogged.value = false
        token.value = ''
    }

    return {
        user,
        isLogged,
        token,

        clear,
    }
})

export default useUserStore;