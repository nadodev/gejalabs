<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutCuriosity extends Model
{
    protected $fillable = [
        'title',
        'description',
        'sort_order',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }
}
