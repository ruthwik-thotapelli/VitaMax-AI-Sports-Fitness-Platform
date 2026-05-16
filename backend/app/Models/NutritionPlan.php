<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NutritionPlan extends Model
{
    protected $fillable = [
        'user_id',
        'goal',
        'dietary_preference',
        'meals',
        'total_calories',
        'macros',
    ];

    protected $casts = [
        'meals' => 'array',
        'macros' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
