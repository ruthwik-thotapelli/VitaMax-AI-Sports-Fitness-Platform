<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkoutPlan;
use App\Models\NutritionPlan;

class OverviewController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $latestWorkout = $user->workoutPlans()->latest()->first();
        $latestNutrition = $user->nutritionPlans()->latest()->first();
        
        // Calculate some pseudo-metrics based on user data
        $power = 2000 + ($user->xp * 0.5);
        $agility = 1000 + ($user->level * 50);
        $rank = max(1, 100 - floor($user->level / 2));
        $progress = min(98, 70 + ($user->streak * 2));
        
        return response()->json([
            'user' => [
                'name' => $user->name,
                'xp' => $user->xp,
                'level' => $user->level,
                'streak' => $user->streak,
            ],
            'metrics' => [
                'power' => number_format($power / 1000, 1) . 'k',
                'agility' => number_format($agility / 1000, 1) . 'k',
                'rank' => '#' . $rank,
                'progress' => $progress,
                'energy_pulse' => number_format(2000 + ($user->level * 100)),
                'neural_power' => 85 + min(14, floor($user->xp / 500)),
                'active_cycle' => $user->streak > 0 ? $user->streak : 0,
                'peak_lvl' => str_pad($user->level, 2, '0', STR_PAD_LEFT),
            ],
            'nutrition' => $latestNutrition ? [
                'goal' => $latestNutrition->goal,
                'calories' => $latestNutrition->total_calories,
                'macros' => $latestNutrition->macros,
            ] : null,
            'workout' => $latestWorkout ? [
                'goal' => $latestWorkout->goal,
                'level' => $latestWorkout->level,
            ] : null,
        ]);
    }
}
