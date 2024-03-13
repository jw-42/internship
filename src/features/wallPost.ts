import bridge from "@vkontakte/vk-bridge";

export const wallPost = (data: string|undefined, translate: string|undefined) => {
    if (data?.length) {
        bridge.send('VKWebAppShowWallPostBox', {
            message: `${translate?.length ? translate.toString() : data?.toString()}\n\nУзнать больше интересных фактов о кошках ты можешь в приложении!`,
            attachments: 'https://vk.com/forms'
        }).then().catch(() => {})
    }
}