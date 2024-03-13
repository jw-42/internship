import {AgifyForm} from "../../../widgets/AgifyInput/ui/AgifyForm";
import {Group, NavIdProps, PanelHeader} from "@vkontakte/vkui";
import {ResizePanel} from "../../../shared/ResizePanel/ui/ResizePanel";

export function AgeByName(props: NavIdProps) {

    return(
        <ResizePanel {...props}>
            <PanelHeader>Возраст</PanelHeader>
            <Group>
                <AgifyForm/>
            </Group>
        </ResizePanel>
    );

}