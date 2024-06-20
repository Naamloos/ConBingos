import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ auth }) {
    const [images, setImages] = useState([]);

    const [form, setForm] = useState({name: '', description: '', icon: ''});

    function processFiles(files)
    {
        // convert all images to base64 strings
        let currentImages = [];
        for(let i = 0; i < files.length; i++)
        {
            let reader = new FileReader();
            reader.onload = (e) => {
                currentImages.push(e.target.result);
                if(currentImages.length === files.length)
                    setImages(currentImages);
            };
            reader.readAsDataURL(files[i]);
        }
    }

    function processIcon(files)
    {
        // convert icon to base64 string
        let reader = new FileReader();
        reader.onload = (e) => {
            setForm({...form, icon: e.target.result});
        };
        reader.readAsDataURL(files[0]);
    }

    function submit()
    {
        // submit form to backend /create with POST
        console.log(form);
        console.log(images);
        let data = {
            name: form.name,
            description: form.description,
            images: images,
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
                            <form>
                                <div className="mt-5">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                                    <input type="text" name="name" id="name" className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        onChange={(e) => setForm({...form, name: e.target.value})}
                                        value={form.name}
                                    />
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                        onChange={(e) => setForm({...form, description: e.target.value})}
                                        value={form.description}
                                        >Description</label>
                                    <input type="text" name="description" id="description" className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Icon</label>
                                    <input type="file" name="icon" id="icon" className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        onChange={(e) => processIcon(e.target.files)}
                                    />
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="images" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Images</label>
                                    <input type="file" name="images" id="images" className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        onChange={(e) => processFiles(e.target.files)} multiple
                                    />
                                </div>
                                <div className="mt-5">
                                    Images selected: {images.length} / 24
                                </div>
                                <div className="mt-5">
                                    <button disabled={images.length !== 24} type="button" onClick={() => submit()} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
                                        {images.length === 24 ? 'Create' : 'Please select 24 images.'}
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
