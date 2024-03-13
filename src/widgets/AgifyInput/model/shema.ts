import * as yup from "yup";

export const schema = yup.object().shape({
    userName: yup.string()
        .required("Нужно обязательно заполнить это поле")
        .matches(/^[a-zA-Z]*$/, "Только английские буквы")
        .min(2, "Минимум 2 символа")
        .max(10, "Максимум 10 символов")
});