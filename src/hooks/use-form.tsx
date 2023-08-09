import React from 'react';

type TFormConfig<T> = {
    initial_value: T;
};

type TFormData = {
    values: any;
    errors: any;
}

interface FormSubmitHandler {
  (values: any, errors: any): void;
}

export const useForm = <T extends {}>({ initial_value }: TFormConfig<T>) => {
    const [form_data, setFormData] = React.useState<TFormData>({
        values: initial_value,
        errors: {},
    });

    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            const newValues = { ...form_data.values, [name]: value };
            setFormData(prevState => {
                return {
                    ...prevState,
                    values: newValues,
                };
            });
        },
        [form_data.values],
    );

    const onSubmit = (onSubmit: FormSubmitHandler) => async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(form_data.values, form_data.errors);
    };

    return {
        onSubmit,
        onChange,
        values: form_data.values,
        errors: form_data.errors,
    };
};
