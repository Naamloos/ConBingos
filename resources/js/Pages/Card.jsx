import Guest from '@/Layouts/GuestLayout.jsx';
import { Head } from '@inertiajs/react';
import React from 'react';
import { useState } from 'react';

export default function Card({card})
 {
    const [cardState, setCardState] = useState(JSON.parse(localStorage.getItem('bingo-' + card.id)));

    function toggleItem(id)
    {
        // ensure card exists in local storage
        if(localStorage.getItem('bingo-' + card.id) === null)
            localStorage.setItem('bingo-' + card.id, JSON.stringify({}));

        let bingo = JSON.parse(localStorage.getItem('bingo-' + card.id));

        if(bingo[id] === undefined)
            bingo[id] = true;
        else
            bingo[id] = !bingo[id];

        localStorage.setItem('bingo-' + card.id, JSON.stringify(bingo));
        setCardState(bingo);
    }

    // Your code for generating the Bingo card goes here
    console.log(card);
    return (
        <Guest>
            <Head title={card.name} />
            {/* create a pretty bingo card which uses the width and height props to define how large the card should be */}
            <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                {/* icon_b64, centered */}
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={card.logo_b64}
                                    alt=""
                                />
                                {/* name */}
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{card.name}</div>
                                {/* description */}
                                <div className="text-xs text-gray-500 dark:text-gray-400">{card.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                {/* 5x5 grid of items */}
                <div className="grid grid-cols-5 gap-4">
                    {card.bingo_items.map((item) =>
                        {
                            let checked = (cardState && cardState[item.id]) ? 'bg-green-700' : 'bg-gray-700';
                            return (
                                <div key={item.id} className={"lg:h-24 lg:w-24 h-16 w-16 overflow-hidden shadow rounded-lg hover:opacity-50 cursor-pointer " + checked}
                                    onClick={() => toggleItem(item.id)}>
                                    <div className="flex items-center justify-center lg:h-24 lg:w-24 h-16 w-16">
                                        <div className="flex-1 truncate text-center" title={item.description}>
                                            {/* if item has an icon, display it. else, display the name */}
                                            {item.icon_b64 ? (
                                                <img
                                                    className="self-center inline-block h-full"
                                                    src={item.icon_b64}
                                                    alt=""
                                                />
                                            ) : (
                                                <>
                                                {/* vertically centered text */}
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{item.title}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </Guest>
    )
};
