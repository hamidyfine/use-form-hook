import React, { useEffect } from 'react';

type TFormConfig<T> = {
    initial_value: T;
};

type TFormData = {
    values: any;
    errors: any;
}

export const useForm = <T extends {}>({ initial_value }: TFormConfig<T>) => {
    const [form_data, setFormData] = React.useState<TFormData>({
        values: initial_value,
        errors: {},
    });

    useEffect(() => {
        console.log('🚀 form_data:', form_data.values);
    }, [form_data]);

    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            const newValues = { ...form_data.values, [name]: value };
            setFormData(prevState => {
                console.log('🚀 ~ file: use-form.tsx:31 ~ prevState:', prevState.values);
                console.log('🚀 ~ file: use-form.tsx:35 ~ newValues:', newValues);
                return {
                    ...prevState,
                    values: newValues,
                };
            });
            console.log('🚀 ~ file: use-form.tsx:24 ~ form_data:', form_data.values);
        },
        [form_data.values],
    );

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // onSubmit(values);
    };

    return {
        onSubmit,
        onChange,
    };
};
