import {
    createHashRouter, RoutesConfig, createView, createPanel
} from "@vkontakte/vk-mini-apps-router";

export const routers = RoutesConfig.create([
    createView('facts', [
        createPanel('getFact', '/'),
        createPanel('getFact', '/facts')
    ]),
    createView('age', [
        createPanel('getByName', '/age')
    ]),
]);

export const router = createHashRouter(routers.getRoutes());