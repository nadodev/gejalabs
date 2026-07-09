<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonalProject extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'status',
        'progress',
        'summary',
        'tech',
        'overview',
        'architecture',
        'decisions',
        'challenges',
        'lessons',
        'repo_url',
        'live_url',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'tech' => 'array',
            'decisions' => 'array',
            'challenges' => 'array',
            'lessons' => 'array',
            'is_published' => 'boolean',
        ];
    }
}
