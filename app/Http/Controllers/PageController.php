<?php

namespace App\Http\Controllers;

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
}
