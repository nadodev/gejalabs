<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->get('lang', $request->get('locale'));

        if (! in_array($locale, ['en', 'pt'], true)) {
            $locale = $request->session()->get('locale');
        }

        if (! in_array($locale, ['en', 'pt'], true)) {
            $locale = $request->segment(1);
        }

        if (! in_array($locale, ['en', 'pt'], true)) {
            $locale = config('app.locale');
        }

        App::setLocale($locale);
        $request->session()->put('locale', $locale);

        return $next($request);
    }
}
