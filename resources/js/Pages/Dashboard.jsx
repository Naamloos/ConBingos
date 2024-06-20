import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, cards }) {
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
                            <Link key={card.id + '-link'} href={route('card', {id: card.id})}>
                                <div key={card.id} className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6 hover:opacity-50 cursor-pointer hover:cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={card.logo_b64}
                                                        alt=""
                                                    />
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{card.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
