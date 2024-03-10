import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";
import {RouterProvider} from '@vkontakte/vk-mini-apps-router';
import {router} from "./router";
import {NotFound} from "./panels/NotFound";
import "./style.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 15 * 60 * 1000,
            retry: 3
        }
    }
});

ReactDOM.render(<ConfigProvider>
    <AdaptivityProvider>
        <AppRoot>
            <RouterProvider router={router} notFound={<NotFound/>}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </RouterProvider>
        </AppRoot>
    </AdaptivityProvider>
</ConfigProvider>, document.getElementById("root"));