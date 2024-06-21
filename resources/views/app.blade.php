<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- check if route is /card/{id} -->
        @if (request()->routeIs('card'))
            @php
                $id = request()->route('id');
                $card = App\Models\Card::find($id);
            @endphp
            <!-- metadata -->
            <meta property="og:title" content="{{ $card->name }}">
            <meta property="og:description" content="{{ $card->description }}">
            <meta property="og:image" content="{{config('app.url')}}/img/{{$card->id}}">
            <meta property="og:url" content="{{ url()->current() }}">
            <meta property="og:type" content="article">
        @else
            <!-- metadata -->
            <meta property="og:title" content="{{ config('app.name', 'Laravel') }}">
            <meta property="og:description" content="Shitty project, funny premise?">
            <meta property="og:url" content="{{ url()->current() }}">
            <meta property="og:type" content="website">
        @endif

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
