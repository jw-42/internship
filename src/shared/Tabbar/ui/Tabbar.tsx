import {Tabbar as TabbarLayout, TabbarItem} from "@vkontakte/vkui";
import {Icon28AccessibilityOutline, Icon28PawOutline} from "@vkontakte/icons";
import {useActiveVkuiLocation, useGetPanelForView, useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {AppRoutes} from "../../../app/router/AppRouter";
import {PanelPage} from "@vkontakte/vk-mini-apps-router/dist/page-types/PanelPage";

export function Tabbar() {

    const routerNavigator = useRouteNavigator();

    const { view: activeView } = useActiveVkuiLocation();
    const activePanel = useGetPanelForView(activeView);

    const go = (target: PanelPage<any>) => routerNavigator.push(target);

    return(
        <TabbarLayout mode="vertical">
            <TabbarItem
                text="Факты"
                selected={activePanel === "catfact"}
                onClick={() => go(AppRoutes.jobs.catfact)}
            >
                <Icon28PawOutline/>
            </TabbarItem>

            <TabbarItem
                text="Возраст"
                selected={activePanel === "agify"}
                onClick={() => go(AppRoutes.jobs.agify)}
            >
                <Icon28AccessibilityOutline/>
            </TabbarItem>
        </TabbarLayout>
    );

}