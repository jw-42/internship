import React from 'react';
import {
	Epic,
	PanelHeader,
	Platform,
	SplitCol,
	SplitLayout,
	Tabbar,
	TabbarItem,
	usePlatform,
	View
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import bridge from "@vkontakte/vk-bridge";
import {useActiveVkuiLocation, useGetPanelForView, usePopout, useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {NotFound} from "./panels/NotFound";
import {
	Icon28BillheadOutline,
	Icon28Users3Outline
} from "@vkontakte/icons";
import {routers} from "./router";
import {Sidebar} from "./panels/Sidebar";
import {Facts} from "./panels/Facts";
import {Age} from "./panels/Age";

function App() {

	const platform = usePlatform();
	const isVKCOM =  platform === Platform.VKCOM;

	const routerPopout = usePopout();
	const routerNavigator = useRouteNavigator();

	const { view: activeView } = useActiveVkuiLocation();
	const activePanel = useGetPanelForView(activeView);

	React.useEffect(() => {
		void bridge.send("VKWebAppInit");
	}, []);

	return (
		<SplitLayout
			header={!isVKCOM && <PanelHeader style={{ maxHeight: "56px" }} />}
			style={isVKCOM ? {justifyContent: "center"} : {justifyContent: "center", flexDirection: "row-reverse"}}
			popout={routerPopout}
		>
			<SplitCol autoSpaced style={isVKCOM ? { marginLeft: 0 } : undefined} maxWidth={550}>
				<Epic
					activeStory={activeView ?? "facts"}
					tabbar={
						!isVKCOM && <Tabbar mode={"vertical"}>
							<TabbarItem
								selected={activeView === "facts"}
								onClick={() => routerNavigator.push(routers.facts.getFact)}
								text="Факты"
							><Icon28BillheadOutline/></TabbarItem>
							<TabbarItem
								selected={activeView === 'age'}
								onClick={() => routerNavigator.push(routers.age.getByName)}
								text="Возраст"
							><Icon28Users3Outline/></TabbarItem>
						</Tabbar>
					}
				>
					<View nav="facts" activePanel={activePanel ?? "default"}>
						<Facts nav="getFact" />
					</View>

					<View nav="age" activePanel={activePanel ?? "default"}>
						<Age nav="getByName" />
					</View>

					<View nav="system" activePanel={activePanel ?? "notFound"}>
						<NotFound nav="notFound" />
					</View>
				</Epic>
			</SplitCol>

			{isVKCOM && <Sidebar/>}

		</SplitLayout>
	);

}

export default App;
