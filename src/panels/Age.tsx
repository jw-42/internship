import {
    Group,
    NavIdProps,
    PanelHeader,
    FormLayout,
    FormItem,
    IconButton,
    Input,
    SimpleCell
} from "@vkontakte/vkui";
import {ResizePanel} from "../components/ResizePanel";
import React, {useRef} from "react";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import {Icon20Search} from "@vkontakte/icons";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAgify} from "../hooks/useAgify";
import {useQueryClient} from "@tanstack/react-query";

function wordForm(count: number, forms: string[]) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return forms[0];
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        return forms[1];
    } else {
        return forms[2];
    }
}

export function Age(props: NavIdProps) {

    const queryClient = useQueryClient();
    const target = useRef<HTMLInputElement>(null);

    const [current, setCurrent] = React.useState<string>('');
    const [inputValue, setInputValue] = React.useState<string>('');
    const [timer, setTimer] = React.useState<NodeJS.Timeout|undefined>(undefined);

    const { data: age } = useAgify(current);

    const schema = yup.object().shape({
        userName: yup.string()
            .required("Нужно обязательно заполнить это поле")
            .matches(/^[a-zA-Z]*$/, "Только английские буквы")
            .min(2, "Минимум 2 символа")
            .max(10, "Максимум 10 символов")
    });

    const { register, handleSubmit, setValue, formState: {errors} } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        if (data?.userName) {
            void queryClient.cancelQueries(["age"] );
            setCurrent(data.userName);
        }
    }


    React.useEffect(() => {
        clearTimeout(timer)

        const newTimer = setTimeout(() => setCurrent(inputValue), 3000);
        setTimer(newTimer);

        return () => clearTimeout(timer)
    }, [ inputValue ]);


    return(
        <ResizePanel {...props}>
            <PanelHeader>Возраст</PanelHeader>
            <Group>
                <FormLayout onSubmit={handleSubmit(onSubmit)}>
                    <SimpleCell
                        disabled
                        subtitle="Получите возраст пользователя по его имени"
                    >Имя пользователя</SimpleCell>
                    <FormItem
                        bottom={
                            errors.userName ? (
                                <span style={{ color: "var(--vkui--color_icon_negative)" }}>
                                    {errors.userName.message}
                                </span>
                            ) : (
                                (age && age > 0) ? (
                                    `Тебе ${age} ${wordForm(age, ["год", "года", "лет"])}`
                                ) : undefined
                            )
                        }
                    >
                        <Input
                            {...register("userName")}
                            getRef={target}
                            type="text"
                            onChange={(e) => {
                                setValue("userName", e.target.value)
                                setInputValue(e.target.value)
                            }}
                            status={errors.userName ? "error" : "default"}
                            placeholder="Например, Ivan"
                            after={
                                <IconButton type="submit" aria-label="Определить возраст">
                                    <Icon20Search/>
                                </IconButton>
                            }
                        />
                    </FormItem>
                </FormLayout>
            </Group>
        </ResizePanel>
    );

}