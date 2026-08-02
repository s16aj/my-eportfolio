<?php

namespace App\Models;
use App\Models\Skill;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bio',
        'phone',
        'location',
        'profile_image',
        'linkedin_url',
        'github_url',
        'website_url',
    ];

    // Computed so the frontend never has to build storage paths itself —
    // works whether profile_image lives on the local disk or object storage.
    protected $appends = ['profile_image_url'];

    protected function profileImageUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->profile_image
                ? Storage::disk('s3')->url($this->profile_image)
                : null,
        );
    }

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