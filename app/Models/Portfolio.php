<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'template_id',
        'slug',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    // Portfolio belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Portfolio uses one template
    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    // Portfolio has one engagement statistic record
    public function engagementStatistic(): HasOne
    {
        return $this->hasOne(EngagementStatistic::class);
    }
}