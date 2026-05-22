<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Create the skills table.
     *
     * Stores the user's skills.
     */
    public function up(): void
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();

            // Each skill belongs to one profile
            $table->foreignId('profile_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('skill_name');
            $table->string('skill_level')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Drop the skills table.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};