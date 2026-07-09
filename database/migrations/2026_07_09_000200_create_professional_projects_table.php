<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('professional_projects', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('period')->nullable();
            $table->string('role');
            $table->string('title');
            $table->text('summary');
            $table->json('tech')->nullable();
            $table->json('modules')->nullable();
            $table->json('contributions')->nullable();
            $table->json('challenges')->nullable();
            $table->json('lessons')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('professional_projects');
    }
};
