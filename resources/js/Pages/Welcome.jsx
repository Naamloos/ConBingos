import Guest from '@/Layouts/GuestLayout.jsx';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion, cards }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <Guest>
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">Welcome to ConBingos</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Shitty project, funny premise?</p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Pick your shitty meme bingo down below 🗣️🗑️ </p>

                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                                                        onError={handleImageError}
                                                    />
                                                    {/* name on newline centered and small */}
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

                <div className="mt-5">
                    <Link href={route('dashboard')} className="text-xs text-gray-600 dark:text-gray-400 underline">Admin</Link>
                </div>
            </Guest>
        </>
    );
}
