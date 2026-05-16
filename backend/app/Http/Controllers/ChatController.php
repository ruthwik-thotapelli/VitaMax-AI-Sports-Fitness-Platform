<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GeminiService;

class ChatController extends Controller
{
    protected $gemini;

    public function __construct(GeminiService $gemini)
    {
        $this->gemini = $gemini;
    }

    public function ask(Request $request)
    {
        $request->validate(['message' => 'required|string']);
        
        $userPrompt = "You are Vitamax Core AI, a premium fitness and performance intelligence. 
        Analyze the following request and provide a high-performance, scientific, and motivating response.
        User Request: " . $request->message;

        $response = $this->gemini->generateResponse($userPrompt);

        return response()->json([
            'reply' => $response,
            'timestamp' => now()->toISOString()
        ]);
    }
}
