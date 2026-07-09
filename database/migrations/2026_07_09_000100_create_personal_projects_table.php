<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('personal_projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('status')->default('planned');
            $table->unsignedTinyInteger('progress')->default(0);
            $table->text('summary');
            $table->json('tech')->nullable();
            $table->text('overview')->nullable();
            $table->text('architecture')->nullable();
            $table->json('decisions')->nullable();
            $table->json('challenges')->nullable();
            $table->json('lessons')->nullable();
            $table->string('repo_url')->nullable();
            $table->string('live_url')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('personal_projects');
    }
};
