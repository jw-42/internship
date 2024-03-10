import {
    Panel,
    PanelHeader,
    SplitCol,
    Group,
    SimpleCell,
    usePlatform, Platform
} from "@vkontakte/vkui";
import {
    Icon24CakeOutline,
    Icon24PawOutline
} from "@vkontakte/icons";
import React from "react";
import {routers} from "../router";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

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
                {!isVKCOM && <PanelHeader/>}
                <Group>
                    <SimpleCell
                        onClick={() => routerNavigator.push(routers.facts.getFact)}
                        before={<Icon24PawOutline/>}
                    >Факты о кошках</SimpleCell>

                    <SimpleCell
                        onClick={() => routerNavigator.push(routers.age.getByName)}
                        before={<Icon24CakeOutline/>}
                    >Возраст</SimpleCell>
                </Group>
            </Panel>
        </SplitCol>
    );

}