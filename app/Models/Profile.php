<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bio',
        'phone',
        'address',
    ];

    // Profile belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Profile can have many education records
    public function educations(): HasMany
    {
        return $this->hasMany(Education::class);
    }

    // Profile can have many skills
    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class);
    }

    // Profile can have many projects
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}