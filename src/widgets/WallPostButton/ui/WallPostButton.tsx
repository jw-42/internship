import {WallPostButtonProps} from "../model/WallPostButtonProps";
import {Button, FormItem} from "@vkontakte/vkui";
import React from "react";

export function WallPostButton(props: WallPostButtonProps) {

    return(
        <FormItem>
            <Button
                size="m"
                stretched
                onClick={props.wallPost}
                disabled={props.disabled}
            >Опубликовать на стене</Button>
        </FormItem>
    );

}