import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "@vkontakte/vk-mini-apps-router";
import {AppRouter} from "./router/AppRouter";
import {App} from "./App";
import React from "react";

export function AppConfig() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 15 * 60 * 1000,
                retry: 3
            }
        }
    });

    return(
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <RouterProvider router={AppRouter}>
                        <QueryClientProvider client={queryClient}>
                            <App />
                        </QueryClientProvider>
                    </RouterProvider>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );

}