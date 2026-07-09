<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfessionalProject extends Model
{
    protected $fillable = [
        'company',
        'period',
        'role',
        'title',
        'summary',
        'tech',
        'modules',
        'contributions',
        'challenges',
        'lessons',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'tech' => 'array',
            'modules' => 'array',
            'contributions' => 'array',
            'challenges' => 'array',
            'lessons' => 'array',
            'is_published' => 'boolean',
        ];
    }
}
