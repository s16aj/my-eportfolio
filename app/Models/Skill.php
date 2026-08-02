<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'skill_name',
        'skill_level',
        'skill_percentage',
    ];

    // Skill belongs to one profile
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}