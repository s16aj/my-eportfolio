<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Create the engagement_statistics table.
     *
     * Stores portfolio engagement information.
     */
    public function up(): void
    {
        Schema::create('engagement_statistics', function (Blueprint $table) {

            // Primary key
            $table->id();

            // Related portfolio
            $table->foreignId('portfolio_id')
                ->constrained()
                ->onDelete('cascade');

            // Total portfolio views
            $table->integer('total_views')->default(0);

            // Most viewed section
            $table->string('most_viewed_section')->nullable();

            // Last portfolio visit time
            $table->timestamp('last_viewed_at')->nullable();

            // Timestamps
            $table->timestamps();
        });
    }

    /**
     * Drop the engagement_statistics table.
     */
    public function down(): void
    {
        Schema::dropIfExists('engagement_statistics');
    }
};