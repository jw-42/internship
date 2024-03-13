import {AppConfig} from "./app/AppConfig";
import bridge from "@vkontakte/vk-bridge";
import '@vkontakte/vkui/dist/vkui.css';
import ReactDOM from "react-dom";
import React from "react";
import "./style.css";

void bridge.send("VKWebAppInit");

ReactDOM.render(<AppConfig/>, document.getElementById("root"));