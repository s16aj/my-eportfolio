<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Create the profiles table.
     *
     * Each user has one profile that stores
     * the main personal information for the portfolio.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();

            // Each profile belongs to one user
            $table->foreignId('user_id')
                ->unique()
                ->constrained()
                ->onDelete('cascade');

            $table->text('bio')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Drop the profiles table.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};