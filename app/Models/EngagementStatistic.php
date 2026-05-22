<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EngagementStatistic extends Model
{
    use HasFactory;

    protected $fillable = [
        'portfolio_id',
        'total_views',
        'most_viewed_section',
        'last_viewed_at',
    ];

    protected $casts = [
        'last_viewed_at' => 'datetime',
    ];

    // Statistics belong to one portfolio
    public function portfolio(): BelongsTo
    {
        return $this->belongsTo(Portfolio::class);
    }
}