<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KnowledgeItem extends Model
{
    protected $fillable = [
        'type',
        'label',
        'year',
        'title',
        'description',
        'accent',
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
