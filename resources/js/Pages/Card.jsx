import Guest from '@/Layouts/GuestLayout.jsx';
import { Head } from '@inertiajs/react';
import React from 'react';
import { useState, useRef } from 'react';
import { useToPng } from '@hugocxl/react-to-image';

export default function Card({card})
 {
    const [cardState, setCardState] = useState(JSON.parse(localStorage.getItem('bingo-' + card.id)));

    const [pngState, convertToPng, pngRef] = useToPng({
        onSuccess: data =>{
            fetch(data).then((fetched) => {
                fetched.blob().then((blob) =>
                {
                    const file = new File([blob], card.name + Math.abs(Math.round(Math.random().toString())) + '.png', { type: blob.type });
                    navigator.share({
                        title: card.name,
                        text: 'Check out my results so far! Card at: ' + window.location.href,
                        files: [file],
                    })
                });
            })
        },
        onError: error => alert('I don\' think your browser supports this feature. Try just sharing a link instead.')
    })

    function shareLink()
    {
        navigator.share({
            title: card.name,
            text: 'Check out this bingo card: ' + window.location.href
        })
    }

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
            <div ref={pngRef} className="bg-white">
                <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    {/* icon_b64, centered */}
                                    <img
                                        className="h-16 w-16"
                                        src={card.logo_b64}
                                        style={{ flexGrow: `calc(100%/100%)` }}
                                        alt=""
                                    />
                                    {/* name */}
                                    <div>
                                        <div className="text-l font-semibold text-gray-900 dark:text-gray-200 text-wrap">{card.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 text-wrap">{card.description}</div>
                                    </div>
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
                                let checked = (cardState && cardState[item.id]) ? 'dark:bg-green-700 bg-green-400' : 'dark:bg-gray-700';
                                return (
                                    <div key={item.id} className={"lg:h-24 lg:w-24 h-16 w-16 overflow-hidden shadow items-center content-center justify-center rounded-lg cursor-pointer " + checked}
                                        onClick={() => toggleItem(item.id)}>
                                            <div className="flex-1 truncate text-center items-center" title={item.description}>
                                                <div className="flex items-center justify-center p-3 max-h-16 max-w-16 lg:max-h-24 lg:max-w-24 text-wrap text-xs">
                                                    {/* if item has an icon, display it. else, display the name */}
                                                    {item.icon_b64 ? (
                                                        <img
                                                            // vertically center
                                                            className="lg:p-2 p-0.5"
                                                            src={item.icon_b64}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <>
                                                            {/* vertically and horizontally centered title in flex */}

                                                                {item.title}

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
            </div>
                            {/* two buttons: share link and share as image */}
            <div className="mt-5 w-100 text-center">
                <button className="inline-block ml-2 self-center cursor-pointer text-sm font-medium text-white dark:text-gray-200 items-center px-4 py-2 border border-transparent rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={shareLink}
                >
                    Share Card Link
                </button>
                <button className="inline-block ml-2 cursor-pointer text-sm font-medium text-white dark:text-gray-200 items-center px-4 py-2 border border-transparent rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={convertToPng}
                >
                    Share Results as Image
                </button>
            </div>
        </Guest>
    )
};
