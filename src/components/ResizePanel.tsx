import { Panel } from "@vkontakte/vkui";
import { useEffect, useRef } from "react";
import bridge from "@vkontakte/vk-bridge";

export function ResizePanel(props: any) {

    const panelRef = useRef(null);

    const handlePanelHeight = () => {
        const panelElement = panelRef.current;

        if (panelElement) {
            // @ts-ignore
            const panelHeight = panelElement.clientHeight;

            bridge.send("VKWebAppResizeWindow", {
                width: 911,
                height: panelHeight < 630 ? 630 : panelHeight > 4050 ? 4050 : panelHeight
            });
        }
    };

    useEffect(() => {
        handlePanelHeight();
    }, [ props.children ]);

    return(
        <Panel {...props}>
            <div ref={panelRef}>
                {props.children}
            </div>
        </Panel>
    );

}