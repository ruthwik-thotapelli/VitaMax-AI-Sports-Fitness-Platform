<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutPlan extends Model
{
    protected $fillable = [
        'user_id',
        'goal',
        'fitness_level',
        'exercises',
        'estimated_calories',
        'duration',
    ];

    protected $casts = [
        'exercises' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
