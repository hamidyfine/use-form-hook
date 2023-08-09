import React from 'react';
import * as yup from 'yup';
import _ from 'lodash';

export type TFormErrors = Record<string, string>;

type TFormConfig<T> = {
    initial_value: T;
    validation_schema?: yup.ObjectSchema<any>;
};

type TFormChangeHandler = {
    (name: string, value: unknown, error: string): void;
}

type TFormSubmitHandler<T> = {
    (values: T, errors: TFormErrors): void;
}

export const useForm = <T extends {}>({ initial_value, validation_schema }: TFormConfig<T>) => {
    const valuesRef = React.useRef<T>(initial_value);
    const errorsRef = React.useRef<TFormErrors>({});

    const validateField = React.useCallback(
        async (name: string) => {
            if (!validation_schema) return;

            try {
                await validation_schema.validateAt(name, valuesRef.current);
                errorsRef.current = _.omit(errorsRef.current, name);
            } catch (error: any) {
                errorsRef.current = { ...errorsRef.current, [name]: error.message };
            }
        },
        [validation_schema],
    );

    const onChange = React.useCallback(
        (onChange?: TFormChangeHandler) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            validateField(name);
            valuesRef.current = { ...valuesRef.current, [name]: value };

            _.defer(() => {
                onChange?.(name, value, errorsRef.current[name]);
            });
        },
        [validateField],
    );

    const onSubmit = (onSubmit: TFormSubmitHandler<T>) => (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        for (const key of Object.keys(valuesRef.current)) {
            validateField(key);
        }

        _.defer(() => {
            onSubmit(valuesRef.current, errorsRef.current);
        });
    };

    return {
        onSubmit,
        onChange,
        values: valuesRef.current,
        errors: errorsRef.current,
    };
};
