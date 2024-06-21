import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ auth }) {
    const [items, setItems] = useState([]);

    const [form, setForm] = useState({name: '', description: '', icon: ''});

    function processIcon(files)
    {
        // convert icon to base64 string
        let reader = new FileReader();
        reader.onload = (e) => {
            setForm({...form, icon: e.target.result});
        };
        reader.readAsDataURL(files[0]);
    }

    function updateItem(newItem, index)
    {
        setItems(items.map((item, i) => {
            if(i === index)
                return newItem;
            return item;
        }));

        console.log(items);
    }

    function setItemImage(files, item, i)
    {
        let reader = new FileReader();
        reader.onload = (e) =>
        {
            updateItem({...item, icon: e.target.result}, i)
        };
        reader.readAsDataURL(files[0]);
    }

    function removeItem(i)
    {
        setItems(items.filter((item, index) => index !== i));
    }

    function submit(e)
    {
        e.preventDefault();
        // submit form to backend /create with POST
        console.log(form);
        console.log(items);
        let data = {
            name: form.name,
            description: form.description,
            items: items,
            icon: form.icon
        };

        router.post(route('postCreate'), data);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* 24 image uploads, text input for name and description, submit button */}
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">Create a new bingo card</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Upload 24 images, and give your bingo card a name and description.</p>
                            {/* disable form for js */}
                            <form onSubmit={(e) => submit(e)} >
                                <div className="mt-5">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                                    <input type="text" name="name" id="name" className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        onChange={(e) => setForm({...form, name: e.target.value})}
                                        value={form.name}
                                        required
                                    />
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                        onChange={(e) => setForm({...form, description: e.target.value})}
                                        value={form.description}
                                        >Description</label>
                                    <textarea type="text" name="description" id="description" className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        onChange={(e) => setForm({...form, description: e.target.value})}
                                        value={form.description}
                                        required
                                    />
                                </div>

                                {form.icon && <img src={form.icon} className="w-24 h-24" />}

                                <div className="mt-5">
                                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Icon</label>
                                    <input type="file" name="icon" id="icon" className="mt-1 block w-full sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                                        onChange={(e) => processIcon(e.target.files)}
                                    />
                                </div>

                                <div className="mt-5">
                                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => items.length < 24? setItems([...items, {title: '', description: '', icon: ''}]) : null}
                                    >
                                        Add Item
                                    </button>
                                </div>

                                {
                                    items.map((item, i) =>
                                    {
                                        return <div className="mt-5 drop-shadow-md bg-slate-100 p-4" key={"item-" + i}>
                                            <label htmlFor={'title-' + i} className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                                            <input type="text" name={'title-' + i} id={'title-' + i} className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                                onChange={(e) => updateItem({...item, title: e.target.value}, i)}
                                                value={item.title}
                                            />
                                            <label htmlFor={'description-' + i} className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
                                            <input type="text" name={'description-' + i} id={'description-' + i} className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                                onChange={(e) => updateItem({...item, description: e.target.value}, i)}
                                                value={item.description}
                                            />
                                            <label htmlFor={'img-' + i} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mt-2">(Optional) Icon</label>
                                            <input type="file" name={'img-' + i} id={'img-' + i} className="mt-1 mb-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                                onChange={(e) => setItemImage(e.target.files, item, i)}
                                            />
                                            {item.icon && <img src={item.icon} className="w-24 h-24" />}
                                            <button type="button" className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                onClick={() => removeItem(i)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    })
                                }

                                <div className="mt-5">
                                    Items: {items.length} / 24
                                </div>
                                <div className="mt-5">
                                    <button disabled={items.length !== 24} type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
                                        {items.length === 24 ? 'Create' : 'Please create 24 items.'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
