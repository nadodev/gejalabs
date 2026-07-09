<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_pages', function (Blueprint $table) {
            $table->id();
            $table->string('eyebrow')->default('// readme');
            $table->string('title')->default('About the lab');
            $table->text('intro');
            $table->json('principles')->nullable();
            $table->string('contact_title')->default('Get in touch');
            $table->text('contact_text')->nullable();
            $table->string('github_url')->nullable();
            $table->string('resume_path')->nullable();
            $table->string('resume_original_name')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_pages');
    }
};
