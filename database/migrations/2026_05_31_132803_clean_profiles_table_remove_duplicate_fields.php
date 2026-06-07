<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn([
                'address',
                'university',
                'major',
                'degree',
                'graduation_year',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('address')->nullable();
            $table->string('university')->nullable();
            $table->string('major')->nullable();
            $table->string('degree')->nullable();
            $table->string('graduation_year')->nullable();
        });
    }
};