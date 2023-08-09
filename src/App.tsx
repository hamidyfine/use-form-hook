import React from 'react';
import * as yup from 'yup';
import _ from 'lodash';
import { TFormErrors, useForm } from './hooks/use-form';

type TFormValues = {
    name: string;
    email: string;
}

const App = () => {
    console.log('app re-rendered!');
    const [errors, setErrors] = React.useState<TFormErrors>();

    const validation_schema = yup.object().shape({
        name: yup.string().min(3, 'Name must be at least 3 characters long'),
        email: yup.string().email('Invalid email').required('Email is required'),
    });

    const { onChange, onSubmit } = useForm<TFormValues>({
        initial_value: {
            name: '',
            email: '',
        },
        validation_schema,
    });

    const onChangeHandler = (name: string, value: unknown, error: string) => {
        if (error) {
            setErrors((errors) => {
                return { ...errors, [name]: error };
            });
        } else if (!error && errors && errors[name as keyof typeof errors]) {
            setErrors((errors) => {
                return _.omit(errors, name);
            });
        }
    };

    const onSubmitHandler = (values: any, errs: any) => {
        if (!_.isEmpty(errs) && !_.isEqual(errors, errs)) {
            setErrors(errs);
        }

        if (_.isEmpty(errs)) {
            if (!_.isEqual(errors, errs)) setErrors(errs);
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-slate-50">
            <div className="flex flex-col items-center justify-center w-2/6">
                <h1 className="text-center text-lg mb-4 w-full">React Form Hook</h1>
                <form
                    className="border rounded-md shadow-sm w-full bg-white p-4"
                    onSubmit={onSubmit(onSubmitHandler)}
                >
                    <div className="flex flex-col mb-4">
                        <label
                            className="text-sm font-light mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className="border rounded-md p-2 text-sm"
                            id="name"
                            name="name"
                            type="text"
                            onChange={onChange(onChangeHandler)}
                        />
                        <span className="pt-1 text-xs text-red-600">{errors && errors['name']}</span>
                    </div>

                    <div className="flex flex-col">
                        <label
                            className="text-sm font-light mb-1"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="border rounded-md p-2 text-sm"
                            id="email"
                            name="email"
                            type="text"
                            onChange={onChange()}
                        />
                        <span className="pt-1 text-xs text-red-600">{errors && errors['email']}</span>
                    </div>

                    <button
                        className="bg-blue-500 px-1 py-2 w-full mt-4 rounded-md text-white font-light active:bg-blue-800 hover:bg-blue-600"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default App;
