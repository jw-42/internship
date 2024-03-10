import {NavIdProps, PanelHeader, Group, Placeholder, Button} from "@vkontakte/vkui";
import {ResizePanel} from "../components/ResizePanel";
import {Icon56GhostOutline} from "@vkontakte/icons";
import {routers} from "../router";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

export function NotFound(props: NavIdProps) {

    const routerNavigator = useRouteNavigator();

    return(
        <ResizePanel {...props}>
            <PanelHeader>Ошибка</PanelHeader>
            <Group>
                <Placeholder
                    header={'Страница не найдена'}
                    icon={<Icon56GhostOutline/>}
                    action={
                        <Button
                            size="m"
                            mode="secondary"
                            onClick={() => routerNavigator.push(routers.facts.getFact)}
                        >На главную</Button>
                    }
                    style={{ minHeight: "50vh" }}
                >
                    Возможно, она была удалена или ещё не создана.
                </Placeholder>
            </Group>
        </ResizePanel>
    );

}