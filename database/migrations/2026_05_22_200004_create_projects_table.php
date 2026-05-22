<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Create the projects table.
     *
     * Stores the user's academic or personal projects.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            // Each project belongs to one profile
            $table->foreignId('profile_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('title');
            $table->text('description')->nullable();
            $table->string('project_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Drop the projects table.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};