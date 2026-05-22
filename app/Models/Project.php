<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'title',
        'description',
        'project_url',
    ];

    // Project belongs to one profile
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}