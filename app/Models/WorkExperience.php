<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkExperience extends Model
{
    protected $fillable = [
        'company',
        'role',
        'description',
        'tags',
        'started_at',
        'ended_at',
        'is_current',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'started_at' => 'date',
            'ended_at' => 'date',
            'is_current' => 'boolean',
        ];
    }
}
