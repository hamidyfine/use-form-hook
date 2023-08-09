import React from 'react';

type TFormConfig<T> = {
    initial_value: T;
};

interface FormSubmitHandler {
  (values: any, errors: any): void;
}

export const useForm = <T extends {}>({ initial_value }: TFormConfig<T>) => {
    const valuesRef = React.useRef<T>(initial_value);
    const errorsRef = React.useRef({});

    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            valuesRef.current = { ...valuesRef.current, [name]: value };
        },
        [],
    );

    const onSubmit = (onSubmit: FormSubmitHandler) => async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(valuesRef.current, errorsRef.current);
    };

    return {
        onSubmit,
        onChange,
        values: valuesRef.current,
        errors: errorsRef.current,
    };
};
