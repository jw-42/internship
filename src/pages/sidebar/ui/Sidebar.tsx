import {Group, Panel, PanelHeader, Platform, SimpleCell, SplitCol, usePlatform} from "@vkontakte/vkui";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {AppRoutes} from "../../../app/router/AppRouter";
import {Icon24CakeOutline, Icon24PawOutline} from "@vkontakte/icons";
import React from "react";

export function Sidebar() {

    const platform = usePlatform();
    const isVKCOM =  platform === Platform.VKCOM;

    const routerNavigator = useRouteNavigator();

    return(
        <SplitCol
            fixed
            width={345}
            maxWidth={345}
            style={{ marginRight: 0 }}
        >
            <Panel>
                {(!isVKCOM) && <PanelHeader/>}
                <Group>
                    <SimpleCell
                        onClick={() => routerNavigator.push(AppRoutes.jobs.catfact)}
                        before={<Icon24PawOutline/>}
                    >Факты о кошках</SimpleCell>

                    <SimpleCell
                        onClick={() => routerNavigator.push(AppRoutes.jobs.agify)}
                        before={<Icon24CakeOutline/>}
                    >Возраст</SimpleCell>
                </Group>
            </Panel>
        </SplitCol>
    );

}