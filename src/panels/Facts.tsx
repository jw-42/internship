import {
    NavIdProps, Group, PanelHeader, FormLayoutGroup, FormItem, Textarea,
    Snackbar, IconButton, SimpleCell, Button, usePlatform, Platform
} from "@vkontakte/vkui";
import {ResizePanel} from "../components/ResizePanel";
import React, {useRef} from "react";
import {
    Icon24HieroglyphCharacterOutline,
    Icon24Switch
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {useCatFact} from "../hooks/useCatFact";

export function Facts(props: NavIdProps) {

    const platform = usePlatform();
    const isVKCOM =  platform === Platform.VKCOM;

    const target = useRef<HTMLTextAreaElement>(null);
    const routerNavigator = useRouteNavigator();

    const [translate, setTranslate] = React.useState('');
    const [fetchTranslate, setFetchTranslate] = React.useState(false);

    const { data: fact, isLoading, refetch } = useCatFact();

    const translateText = () => {
        setFetchTranslate(true);

        if (fact.length) {
            // @ts-ignore
            bridge.send("VKWebAppTranslate", {
                texts: [ fact.replace(",", " ") ],
                translation_language: "en-ru"
            })
                // @ts-ignore
                .then(({result}) => setTranslate(result.texts))
                .catch(() => routerNavigator.showPopout(
                    <Snackbar onClose={() => routerNavigator.hidePopout()}>
                        Не удалось перевести текст, попробуйте позже.
                    </Snackbar>
                ))
                .finally(() => setFetchTranslate(false))
        }
    }

    const wallPostHandle = () => {
        if (fact.length && !isLoading) {
            bridge.send('VKWebAppShowWallPostBox', {
                message: `${translate.length ? translate.toString() : fact.toString()}\n\nУзнать больше интересных фактов о кошках ты можешь в приложении!`,
                attachments: 'https://vk.com/forms'
            }).then().catch(() => {})
        }
    }

    React.useEffect(() => {
        setTranslate('');

        if (fact && target.current) {
            if (fact.split(' ').length > 0) {
                const firstWord = fact.split(' ')[0];
                const position = fact.indexOf(firstWord) + firstWord.length;
                target.current.setSelectionRange(position,position);
                target.current.focus();
            }
        }
    }, [ fact ]);

    return(
        <ResizePanel {...props}>
            <PanelHeader>Факты</PanelHeader>
            <Group>
                <SimpleCell
                    disabled
                    subtitle="Случайные факты о кошках"
                    after={
                        <>
                            {isVKCOM && <IconButton
                                aria-label="Перевести"
                                disabled={isLoading || !fact.length || fetchTranslate}
                                onClick={translateText}
                            >
                                <Icon24HieroglyphCharacterOutline/>
                            </IconButton>}

                            <IconButton
                                aria-label="Повторить"
                                style={{ padding: "0 8px" }}
                                disabled={isLoading}
                                onClick={() => void refetch()}
                            >
                                <Icon24Switch/>
                            </IconButton>
                        </>
                    }
                >Кото-факты</SimpleCell>

                <FormLayoutGroup segmented mode="vertical">
                    <FormItem>
                        <Textarea
                            rows={4}
                            getRef={target}
                            value={fact ?? ''}
                            onChange={() => {}}
                            placeholder="Здесь будет случайный факт"
                        />
                    </FormItem>

                    {isVKCOM && <FormItem>
                        <Textarea
                            rows={4}
                            readOnly={true}
                            value={translate}
                            placeholder="Здесь будет перевод текста на русский"
                        />
                    </FormItem>}
                </FormLayoutGroup>

                <FormItem>
                    <Button
                        size="m"
                        stretched
                        onClick={wallPostHandle}
                        disabled={isLoading || !fact.length || fetchTranslate}
                    >Опубликовать на стене</Button>
                </FormItem>
            </Group>
        </ResizePanel>
    );

}