<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutGalleryPhoto extends Model
{
    protected $fillable = [
        'image_path',
        'caption',
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
