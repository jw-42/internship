import bridge from "@vkontakte/vk-bridge";

export const translateText = async (text: string) => {

    // @ts-ignore
    return( await bridge.send("VKWebAppTranslate", {
        texts: [ text.toString().replace(",", " ") ],
        translation_language: "en-ru"
    }) );

}