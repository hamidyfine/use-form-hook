import { useForm } from './hooks/use-form';

type TFormValues = {
    name: string;
    email: string;
}

const App = () => {
    console.log('app re-rendered!');

    const formHandler = useForm<TFormValues>({
        initial_value: {
            name: '',
            email: '',
        },
    });

    const onSubmitHandler = (values: any, errors: any) => {
        console.log('🚀 ~ file: App.tsx:19 ~ errors:', errors);
        console.log('🚀 ~ file: App.tsx:19 ~ values:', values);
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-slate-50">
            <div className="flex flex-col items-center justify-center w-2/6">
                <h1 className="text-center text-lg mb-4 w-full">React Form Hook</h1>
                <form
                    className="border rounded-md shadow-sm w-full bg-white p-4"
                    onSubmit={formHandler.onSubmit(onSubmitHandler)}
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
                            onChange={formHandler.onChange}
                        />
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
                            onChange={formHandler.onChange}
                        />
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
