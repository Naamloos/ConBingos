import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({ auth, cards }) {

    function deleteCard(e, id)
    {
        e.stopPropagation();
        // submit form to backend /create with POST
        console.log(id);

        router.delete(route('deleteCard', {id: id}));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* list cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {cards.map((card) => (
                            <>
                                <div key={card.id} className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg relative">
                                    <button className="absolute top-1 right-1 bg-red-500 rounded-full h-6 w-6 flex items-center justify-center"
                                        onClick={(e) => deleteCard(e, card.id)}>
                                        <span className="text-white">🗑️</span>
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
