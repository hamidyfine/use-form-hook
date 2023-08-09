import React from 'react';
import yup from 'yup';
import _ from 'lodash';

type TFormConfig<T> = {
    initial_value: T;
    validation_schema?: yup.ObjectSchema<any>;
};

type FormSubmitHandler = {
  (values: any, errors: any): void;
}

export const useForm = <T extends {}>({ initial_value, validation_schema }: TFormConfig<T>) => {
    const valuesRef = React.useRef<T>(initial_value);
    const errorsRef = React.useRef({});

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
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            valuesRef.current = { ...valuesRef.current, [name]: value };
            validateField(name);
        },
        [validateField],
    );

    const onSubmit = (onSubmit: FormSubmitHandler) => (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        for (const key of Object.keys(valuesRef.current)) {
            validateField(key);
        }

        setTimeout(() => {
            onSubmit(valuesRef.current, errorsRef.current);
        }, 0);
    };

    return {
        onSubmit,
        onChange,
        values: valuesRef.current,
        errors: errorsRef.current,
    };
};
