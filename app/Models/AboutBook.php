<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutBook extends Model
{
    protected $fillable = [
        'title',
        'author',
        'description',
        'image_path',
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
