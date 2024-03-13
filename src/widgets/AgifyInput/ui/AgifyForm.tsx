import {FormItem, FormLayout, IconButton, Input, SimpleCell} from "@vkontakte/vkui";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {schema} from "../model/shema";
import {useQueryClient} from "@tanstack/react-query";
import {Icon20Search} from "@vkontakte/icons";
import React, {useRef} from "react";
import {useAgify} from "../../../pages/agify/hooks/useAgify";
import {wordForm} from "../../../features/wordForm";

export function AgifyForm() {

    const [current, setCurrent] = React.useState<string>('');
    const [inputValue, setInputValue] = React.useState<string>('');
    const [timer, setTimer] = React.useState<NodeJS.Timeout|undefined>(undefined);

    const queryClient = useQueryClient();
    const { data: age } = useAgify(current);
    const target = useRef<HTMLInputElement>(null);

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
        <FormLayout onSubmit={handleSubmit(onSubmit)}>
            <SimpleCell
                disabled
                subtitle="Получите возраст пользователя по его имени"
            >Имя пользователя</SimpleCell>

            <FormItem bottom={
                errors.userName ? (
                    <span style={{ color: "var(--vkui--color_icon_negative)" }}>
                        {errors.userName.message}
                    </span>
                ) : (
                    (age && age > 0) ? (
                        `Тебе ${age} ${wordForm(age, ["год", "года", "лет"])}`
                    ) : undefined
                )
            }>
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
    );

}