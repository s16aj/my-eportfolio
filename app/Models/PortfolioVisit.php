<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioVisit extends Model
{
    /**
     * These fields can be filled using create() or update().
     */
    protected $fillable = [
        'portfolio_id',
        'visitor_ip',
        'viewed_section',
        'visited_at',
    ];

    /**
     * Cast visited_at to a Carbon datetime object automatically.
     */
    protected $casts = [
        'visited_at' => 'datetime',
    ];

    // ──────────────────────────────────────────────────────────────────────────
    // Relationships
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * A portfolio visit belongs to one portfolio.
     */
    public function portfolio(): BelongsTo
    {
        return $this->belongsTo(Portfolio::class);
    }
}
