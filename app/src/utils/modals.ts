import { open, ask, message, confirm } from '@tauri-apps/plugin-dialog'

// Простое сообщение
export const showMessage = async (title: string, content: string) => {
    await message(content, { title, kind: 'info' })
}

// Предупреждение
export const showWarning = async (title: string, content: string) => {
    await message(content, { title, kind: 'warning' })
}

// Ошибка
export const showError = async (title: string, content: string) => {
    await message(content, { title, kind: 'error' })
}

// Диалог с да/нет
export const showConfirm = async (title: string, content: string): Promise<boolean> => {
    return await confirm(content, { title, kind: 'warning' })
}

// Диалог с вопросом
export const showAsk = async (title: string, content: string): Promise<boolean> => {
    return await ask(content, { title })
}

// Выбор файла
export const openFile = async (filters?: { name: string; extensions: string[] }[]) => {
    return await open({
        multiple: false,
        filters,
        title: 'Выберите файл'
    })
}

// Выбор папки
export const openFolder = async () => {
    return await open({
        directory: true,
        multiple: false,
        title: 'Выберите папку'
    })
}