<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Create the portfolios table.
     *
     * Stores the user's portfolio and the selected template.
     */
    public function up(): void
    {
        Schema::create('portfolios', function (Blueprint $table) {

            // Primary key
            $table->id();

            // Portfolio owner
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            // Selected portfolio template
            $table->foreignId('template_id')
                ->constrained()
                ->onDelete('cascade');

            // Unique URL slug for portfolio sharing
            $table->string('slug')->unique();
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Drop the portfolios table.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};