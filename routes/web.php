<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Models\Card;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(PageController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/card/{id}', 'card')->name('card');
    Route::get('/create', 'create')->middleware(['auth', 'verified'])->name('create');
    Route::post('/create', 'postCreate')->middleware(['auth', 'verified'])->name('postCreate');
    Route::delete('/card/{id}', 'deleteCard')->middleware(['auth', 'verified'])->name('deleteCard');
    Route::get('/img/{id}', 'showIcon')->name('img');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'cards' => Card::all()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
