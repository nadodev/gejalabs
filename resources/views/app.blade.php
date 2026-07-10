<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="GejaLabs e um portfolio e laboratorio de engenharia de software focado em arquitetura, IA, backend, experiencia do desenvolvedor e projetos praticos.">
        <meta name="author" content="GejaLabs">
        <meta name="robots" content="index,follow">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="GejaLabs">
        <meta property="og:title" content="GejaLabs | Portfolio de Engenharia de Software">
        <meta property="og:description" content="Um laboratorio pessoal de engenharia de software com projetos de arquitetura, IA, backend e experiencia do desenvolvedor.">
        <meta property="og:image" content="{{ url('/og-image.svg') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:url" content="{{ url('/') }}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="GejaLabs | Portfolio de Engenharia de Software">
        <meta name="twitter:description" content="Um laboratorio pessoal de engenharia de software com projetos de arquitetura, IA, backend e experiencia do desenvolvedor.">
        <meta name="twitter:image" content="{{ url('/og-image.svg') }}">
        <link rel="canonical" href="{{ url('/') }}">

        <title inertia>{{ config('app.name', 'GejaLabs') }}</title>
    <link rel="icon" type="image/png" sizes="16x16"  href="/favicon.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
