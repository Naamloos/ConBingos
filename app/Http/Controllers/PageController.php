<?php

namespace App\Http\Controllers;

use App\Models\BingoItem;
use App\Models\Card;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Inertia\Inertia;

class PageController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Welcome',
        [
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'cards' => Card::all()
        ]);
    }

    public function card($id)
    {
        return Inertia::render('Card', [
            'card' => Card::findOrFail($id)->load('bingoItems')
        ]);
    }

    public function deleteCard($id)
    {
        $card = Card::findOrFail($id);
        $card->delete();
        return redirect()->route('dashboard');
    }

    public function create()
    {
        return Inertia::render('Create');
    }

    public function postCreate(Request $request)
    {
        $card = new Card();
        $card->name = $request->input('name');
        $card->description = $request->input('description');
        $card->logo_b64 = $request->input('icon');
        $card->user_id = $request->user()->id;
        $card->save();
        $card->refresh();

        for($i = 0; $i < 12; $i++)
        {
            $item = new BingoItem();
            $item->title = '';
            $item->description = '';
            $item->icon_b64 = $request->input('images')[$i];
            $item->card_id = $card->id;
            $item->save();
        }

        $free = new BingoItem();
        $free->title = 'Free';
        $free->description = 'Free Spot!';
        $free->icon_b64 = '';
        $free->card_id = $card->id;
        $free->save();

        for($i = 12; $i < 24; $i++)
        {
            $item = new BingoItem();
            $item->title = '';
            $item->description = '';
            $item->icon_b64 = $request->input('images')[$i];
            $item->card_id = $card->id;
            $item->save();
        }

        return redirect()->route('card', ['id' => $card->id]);
    }

    public function showIcon($cardId)
    {
        $card = Card::findOrFail($cardId);
        // data:image/png;
        $contentType = substr(explode(';', $card->logo_b64)[0], 5);
        $content = explode(',', $card->logo_b64)[1];
        return response(base64_decode($content))->header('Content-Type', $contentType);
    }
}
