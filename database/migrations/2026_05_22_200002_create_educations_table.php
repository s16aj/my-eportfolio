<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Create the educations table.
     *
     * Stores the student's educational background.
     */
    public function up(): void
    {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();

            // Each education record belongs to one profile
            $table->foreignId('profile_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('institution');
            $table->string('degree');
            $table->string('field_of_study');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Drop the educations table.
     */
    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};