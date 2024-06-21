import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, cards }) {

    const [newInvite, setNewInvite] = useState('');

    function deleteCard(e, id)
    {
        e.stopPropagation();
        // submit form to backend /create with POST
        console.log(id);

        router.delete(route('deleteCard', {id: id}));
        alert('Card deleted!');
        // reload
        location.reload();
    }

    function getNewInvite()
    {
        // GET request to /invite, returns a new invite code
        // with inertia
        fetch(route('invite')).then((response) => {
            response.json().then((data) => {
                setNewInvite(data.code);
            });
        });
    }

    function hide(e, cardId)
    {
        e.stopPropagation();
        // PUT request to /hide, returns true or false
        router.put(route('hide', {id: cardId}));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-2 ">
                    <div className="mb-5 text-center">
                        <div className="inline-block">
                            <button
                                onClick={getNewInvite}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Generate Invite Code
                            </button>
                            <input
                                value={newInvite}
                                className="border border-gray-300 dark:border-gray-700 rounded p-1 ml-2"
                                disabled
                            />
                            {/* copy button */}
                            <button
                                onClick={() => {navigator.clipboard.writeText(newInvite); alert('Copied!')}}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                            >
                                Copy Invite Code
                            </button>
                        </div>
                    </div>
                    {/* list cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {cards.map((card) => (
                            <>
                                <div key={card.id} className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg relative">
                                    <button className="absolute top-10 right-1 bg-purple-500 rounded-full h-6 w-24 flex items-center justify-center text-xs"
                                        onClick={(e) => hide(e, card.id)}>
                                        <span className="text-white">Toggle Hidden</span>
                                    </button>
                                    <button className="absolute top-2 right-1 bg-red-500 rounded-full h-6 w-24 flex items-center justify-center text-xs"
                                        onClick={(e) => deleteCard(e, card.id)}>
                                        <span className="text-white">Delete</span>
                                    </button>
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3 hover:opacity-50 cursor-pointer">
                                                    <Link key={card.id + '-link'} href={`/card/${card.id}`}>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={card.logo_b64}
                                                            alt=""
                                                        />
                                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{card.name}</div>
                                                        {card.hidden ? <div className="text-xs text-red-500">Hidden</div> : <></>}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
