<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutPage extends Model
{
    protected $fillable = [
        'eyebrow',
        'title',
        'intro',
        'principles',
        'contact_title',
        'contact_text',
        'github_url',
        'linkedin_url',
        'resume_path',
        'resume_original_name',
    ];

    protected function casts(): array
    {
        return [
            'principles' => 'array',
        ];
    }
}
