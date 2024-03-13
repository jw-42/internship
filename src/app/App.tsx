import {Epic, PanelHeader, Platform, SplitCol, SplitLayout, usePlatform, View} from "@vkontakte/vkui";
import {AgeByName} from "../pages/agify/ui/AgeByName";
import {useActiveVkuiLocation, useGetPanelForView} from "@vkontakte/vk-mini-apps-router";
import {CatFact} from "../pages/catfact/ui/CatFact";
import {Sidebar} from "../pages/sidebar/ui/Sidebar";
import {Tabbar} from "../shared/Tabbar/ui/Tabbar";

export function App() {

    const platform = usePlatform();
    const isVKCOM =  platform === Platform.VKCOM;

    const { view: activeView } = useActiveVkuiLocation();
    const activePanel = useGetPanelForView(activeView);

    return(
        <SplitLayout
            header={!isVKCOM && <PanelHeader style={{ maxHeight: "56px" }} />}
            style={isVKCOM ? {justifyContent: "center"} : {justifyContent: "center", flexDirection: "row-reverse"}}
        >
            <SplitCol
                autoSpaced
                maxWidth={550}
                style={ isVKCOM ? { marginLeft: 0 } : undefined }
            >
                <Epic activeStory={activeView ?? "jobs"} tabbar={<Tabbar/>}>
                    <View nav="jobs" activePanel={activePanel ?? "catfact"}>
                        <AgeByName nav="agify" />
                        <CatFact nav="catfact" />
                    </View>
                </Epic>
            </SplitCol>

            {isVKCOM && <SplitCol fixed width={345} maxWidth={345} style={{ marginRight: 0 }}>
                <Sidebar/>
            </SplitCol>}
        </SplitLayout>
    );

}