import {Group, IconButton, NavIdProps, PanelHeader, SimpleCell} from "@vkontakte/vkui";
import {ResizePanel} from "../../../shared/ResizePanel/ui/ResizePanel";
import {wallPost} from "../../../features/wallPost";
import {SegmentTextarea} from "../../../widgets/SegmentTextarea/ui/SegmentTextarea";
import {WallPostButton} from "../../../widgets/WallPostButton/ui/WallPostButton";
import React from "react";
import {useCatFact} from "../hooks/useCatFact";
import {Icon24HieroglyphCharacterOutline, Icon24Switch} from "@vkontakte/icons";
import {translateText} from "../../../features/translateText";

export function CatFact(props: NavIdProps) {

    const [translate, setTranslate] = React.useState('');
    const [fetchTranslate, setFetchTranslate] = React.useState(false);

    const { data, isLoading, refetch } = useCatFact();

    React.useEffect(() => {
        setTranslate('');
    }, [ data ])

    return(
        <ResizePanel {...props}>
            <PanelHeader>Факты</PanelHeader>
            <Group>
                <SimpleCell
                    disabled
                    subtitle="Случайные факты о кошках"
                    after={
                        <>
                            <IconButton
                                aria-label="Перевести"
                                disabled={isLoading || !data.length || fetchTranslate}
                                onClick={() => {
                                    setFetchTranslate(true);
                                    translateText(data)
                                        .then((data: any) => {
                                            if (data?.result) {
                                                setTranslate(data.result.texts.join(" "));
                                            } else if (data?.texts) {
                                                setTranslate(data.texts.join(" "));
                                            }
                                        })
                                        .finally(() => setFetchTranslate(false))
                                }}
                            >
                                <Icon24HieroglyphCharacterOutline/>
                            </IconButton>
                            <IconButton
                                aria-label="Повторить"
                                style={{ padding: "0 8px" }}
                                disabled={isLoading || fetchTranslate}
                                onClick={() => void refetch()}
                            >
                                <Icon24Switch/>
                            </IconButton>
                        </>
                    }
                >Кото-факты</SimpleCell>

                <SegmentTextarea
                    data={data}
                    translate={translate}
                />

                <WallPostButton
                    wallPost={() => wallPost(data, translate)}
                    disabled={isLoading || !data.length || fetchTranslate}
                />
            </Group>
        </ResizePanel>
    );

}