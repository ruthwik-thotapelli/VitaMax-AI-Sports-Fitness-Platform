<?php

namespace App\Http\Controllers;

use App\Models\WorkoutPlan;
use Illuminate\Http\Request;
use App\Services\GeminiService;
use Illuminate\Support\Facades\Log;

class WorkoutController extends Controller
{
    protected $gemini;

    public function __construct(GeminiService $gemini)
    {
        $this->gemini = $gemini;
    }

    public function generate(Request $request)
    {
        $request->validate([
            'age' => 'required|integer',
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
            'goal' => 'required|string',
            'fitness_level' => 'required|string',
            'sport_interest' => 'required|string',
        ]);

        $prompt = "Act as a world-class elite performance coach for Vitamax. Create a hyper-efficient, personalized workout protocol.
        Athlete Profile:
        - Age: {$request->age}
        - Current Mass: {$request->weight}kg
        - Vertical Scale: {$request->height}cm
        - Primary Objective: {$request->goal}
        - Experience Level: {$request->fitness_level}
        - Specialized Interest: {$request->sport_interest}
        
        The response must be highly tactical, using sports science terminology where appropriate.
        Return ONLY a JSON object with this exact structure:
        {
          \"estimated_calories\": 520,
          \"duration\": \"45m\",
          \"exercises\": [
            {\"name\": \"EXPLOSIVE BURPEES\", \"reps\": \"4x15\", \"type\": \"HIIT/PLYO\"},
            {\"name\": \"COMPOUND SQUATS\", \"reps\": \"5x12\", \"type\": \"STRENGTH\"},
            {\"name\": \"ISOLATION LUNGES\", \"reps\": \"3x20\", \"type\": \"HYPERTROPHY\"},
            {\"name\": \"NEURAL PLANK\", \"reps\": \"3x60s\", \"type\": \"CORE STABILITY\"},
            {\"name\": \"PLYO PUSHUPS\", \"reps\": \"4xMAX\", \"type\": \"POWER\" }
          ]
        }";

        $aiResponse = $this->gemini->generateResponse($prompt);
        $data = json_decode($aiResponse, true);

        if (!$data || !isset($data['exercises'])) {
            Log::warning('Gemini Workout Generation Failed, using fallback. Response: ' . $aiResponse);
            $data = [
                'estimated_calories' => rand(300, 600),
                'duration' => '45 mins',
                'exercises' => $this->getFallbackExercises($request->goal)
            ];
        }
        
        $plan = WorkoutPlan::create([
            'user_id' => $request->user()->id,
            'goal' => $request->goal,
            'fitness_level' => $request->fitness_level,
            'exercises' => $data['exercises'],
            'estimated_calories' => $data['estimated_calories'],
            'duration' => $data['duration'],
        ]);

        return response()->json($plan);
    }

    public function index(Request $request)
    {
        return $request->user()->workoutPlans()->latest()->get();
    }

    public function complete(Request $request, WorkoutPlan $workout)
    {
        $user = $request->user();
        
        // Ensure user owns the workout
        if ($workout->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->increment('xp', 50);
        
        // Level up logic: every 500 XP = 1 Level
        $newLevel = floor($user->xp / 500) + 1;
        if ($newLevel > $user->level) {
            $user->level = $newLevel;
            $user->save();
        }
        
        return response()->json([
            'message' => 'Sequence Initialized. +50 XP Awarded.',
            'new_xp' => $user->xp,
            'new_level' => $user->level
        ]);
    }

    private function getFallbackExercises($goal)
    {
        return [
            ['name' => 'Burpees', 'reps' => '3x15', 'type' => 'HIIT'],
            ['name' => 'Pushups', 'reps' => '3x20', 'type' => 'Strength'],
            ['name' => 'Squats', 'reps' => '3x25', 'type' => 'Strength'],
            ['name' => 'Plank', 'reps' => '3x60s', 'type' => 'Core'],
            ['name' => 'Lunges', 'reps' => '3x12 each', 'type' => 'Strength'],
        ];
    }
}
