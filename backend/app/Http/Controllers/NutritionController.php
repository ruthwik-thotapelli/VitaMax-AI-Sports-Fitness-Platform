<?php

namespace App\Http\Controllers;

use App\Models\NutritionPlan;
use Illuminate\Http\Request;
use App\Services\GeminiService;
use Illuminate\Support\Facades\Log;

class NutritionController extends Controller
{
    protected $gemini;

    public function __construct(GeminiService $gemini)
    {
        $this->gemini = $gemini;
    }

    public function generate(Request $request)
    {
        $request->validate([
            'weight' => 'required|numeric',
            'goal' => 'required|string',
            'dietary_preference' => 'string',
        ]);

        $weight = $request->weight;
        $goal   = $request->goal;
        $pref   = $request->dietary_preference ?? 'None';

        $prompt = 'Act as a world-class elite sports nutritionist. Create a hyper-personalized meal plan for a high-performance athlete with:'
            . " Weight: {$weight}kg (portions must be precise for this mass),"
            . " Goal: {$goal},"
            . " Dietary Preference: {$pref}."
            . ' Return ONLY a valid JSON object (no markdown, no extra text) with this exact structure:'
            . ' {"total_calories":2500,"macros":{"protein":"180g","carbs":"250g","fats":"70g"},'
            . '"meals":['
            . '{"name":"Meal Name","type":"Breakfast","image":"https://images.unsplash.com/photo-ID?w=800&q=80"},'
            . '{"name":"Meal Name","type":"Lunch","image":"https://images.unsplash.com/photo-ID?w=800&q=80"},'
            . '{"name":"Meal Name","type":"Snack","image":"https://images.unsplash.com/photo-ID?w=800&q=80"},'
            . '{"name":"Meal Name","type":"Dinner","image":"https://images.unsplash.com/photo-ID?w=800&q=80"}'
            . ']}'
            . " Use real, valid Unsplash URLs that visually match each meal and the dietary preference ({$pref}).";

        $aiResponse = $this->gemini->generateResponse($prompt);
        $data = json_decode($aiResponse, true);

        if (!$data || !isset($data['meals'])) {
            Log::warning('Gemini Nutrition Generation Failed, using fallback. Response: ' . $aiResponse);
            $data = [
                'total_calories' => rand(2200, 2800),
                'macros' => ['protein' => '160g', 'carbs' => '240g', 'fats' => '80g'],
                'meals' => $this->getFallbackMeals()
            ];
        }
        
        $plan = NutritionPlan::create([
            'user_id' => $request->user()->id,
            'goal' => $request->goal,
            'dietary_preference' => $request->dietary_preference ?? 'None',
            'meals' => $data['meals'],
            'total_calories' => $data['total_calories'],
            'macros' => $data['macros'],
        ]);

        return response()->json($plan);
    }

    public function index(Request $request)
    {
        return $request->user()->nutritionPlans()->latest()->get();
    }

    private function getFallbackMeals()
    {
        return [
            ['name' => 'Steel-Cut Oats with Berries', 'type' => 'Breakfast', 'image' => 'https://images.unsplash.com/photo-1490645935967-10de6ba17051?auto=format&fit=crop&w=1200&q=80'],
            ['name' => 'Mediterranean Power Salad', 'type' => 'Lunch', 'image' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80'],
            ['name' => 'High-Performance Protein Shake', 'type' => 'Snack', 'image' => 'https://images.unsplash.com/photo-1577112000071-3406e1215112?auto=format&fit=crop&w=1200&q=80'],
            ['name' => 'Atlantic Salmon & Veggies', 'type' => 'Dinner', 'image' => 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80'],
        ];
    }
}
