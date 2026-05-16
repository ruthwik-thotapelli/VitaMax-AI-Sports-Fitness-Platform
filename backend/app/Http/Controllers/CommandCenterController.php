<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GeminiService;
use App\Models\WorkoutPlan;
use App\Models\NutritionPlan;

class CommandCenterController extends Controller
{
    protected $gemini;

    public function __construct(GeminiService $gemini)
    {
        $this->gemini = $gemini;
    }

    public function index(Request $request)
    {
        $user = $request->user();
        
        // Fetch latest stats
        $latestWorkout = $user->workoutPlans()->latest()->first();
        $latestNutrition = $user->nutritionPlans()->latest()->first();
        
        // Construct prompt for Gemini to generate dynamic briefing
        $prompt = "Act as a futuristic AI Command Center. 
        Analyze this athlete's data and provide a concise, high-impact status update.
        Athlete: {$user->name}
        Current XP: {$user->xp}
        Level: {$user->level}
        Streak: {$user->streak}
        Latest Workout: " . ($latestWorkout ? $latestWorkout->goal : 'None') . "
        Latest Nutrition Goal: " . ($latestNutrition ? $latestNutrition->goal : 'None') . "
        
        Return ONLY a JSON object with this exact structure:
        {
            \"briefing\": \"Short 2-sentence mission briefing with tactical tone.\",
            \"alignment_score\": 92,
            \"intensity_escalation\": \"+15%\",
            \"neural_insight\": \"A very short futuristic insight about sleep or energy.\",
            \"neural_insight_val\": \"8.2 HRS\",
            \"neural_insight_sub\": \"+12% Gain\",
            \"energy_matrix\": \"PEAK (V4.2)\",
            \"energy_matrix_status\": \"Active\"
        }";

        $aiResponse = $this->gemini->generateResponse($prompt);
        $data = json_decode($aiResponse, true);

        // Fallback if AI fails
        if (!$data) {
            $data = [
                "briefing" => "Your biometric alignment is optimal. Continue current protocols to maintain peak threshold.",
                "alignment_score" => 92,
                "intensity_escalation" => "+15%",
                "neural_insight" => "Sleep Analysis",
                "neural_insight_val" => "8.2 HRS",
                "neural_insight_sub" => "+12% Gain",
                "energy_matrix" => "PEAK (V4.2)",
                "energy_matrix_status" => "Active"
            ];
        }

        return response()->json([
            'user' => [
                'name' => $user->name,
                'xp' => $user->xp,
                'level' => $user->level,
                'streak' => $user->streak,
            ],
            'ai_data' => $data,
            'latest_protocols' => $user->workoutPlans()->latest()->take(3)->get()
        ]);
    }
}
