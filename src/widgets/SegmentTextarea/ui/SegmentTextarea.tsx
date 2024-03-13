import {FormItem, FormLayoutGroup, Textarea} from "@vkontakte/vkui";
import {SegmentTextareaProps} from "../model/SegmentTextareaProps";
import React, {useRef} from "react";

export function SegmentTextarea(props: SegmentTextareaProps) {

    const { data, translate } = props;

    const target = useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (data && target.current) {
            if (data.split(' ').length > 0) {
                const firstWord = data.split(' ')[0];
                const position = data.indexOf(firstWord) + firstWord.length;
                target.current.setSelectionRange(position,position);
                target.current.focus();
            }
        }
    }, [ data ])

    return(
        <FormLayoutGroup segmented mode="vertical">
            <FormItem>
                <Textarea
                    rows={4}
                    getRef={target}
                    value={data ?? ''}
                    onChange={() => {}}
                    placeholder="It's random fact about cat on English"
                />
            </FormItem>

            <FormItem>
                <Textarea
                    rows={4}
                    readOnly={true}
                    value={translate}
                    placeholder="Перевод на русский язык"
                />
            </FormItem>
        </FormLayoutGroup>
    );

}