import {createHashRouter, createPanel, createView, RoutesConfig} from "@vkontakte/vk-mini-apps-router";

export const AppRoutes = RoutesConfig.create([
    createView("jobs", [
        createPanel("catfact", "/jobs/catfact"),
        createPanel("catfact", "/"),
        createPanel("agify", "/jobs/agify")
    ])
]);

export const AppRouter = createHashRouter(AppRoutes.getRoutes());