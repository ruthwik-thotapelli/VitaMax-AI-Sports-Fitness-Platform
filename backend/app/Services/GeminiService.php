<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
    }

    public function generateResponse(string $prompt)
    {
        if (!$this->apiKey) {
            return "Intelligence Offline. Please configure GEMINI_API_KEY.";
        }

        try {
            $response = Http::post("{$this->baseUrl}?key={$this->apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
                
                if (!$text) {
                    return "Unable to process neural request.";
                }

                // Clean up the response if it contains markdown code blocks
                if (str_contains($text, '```json')) {
                    $text = preg_replace('/```json\s?|\s?```/', '', $text);
                } elseif (str_contains($text, '```')) {
                    $text = preg_replace('/```\s?|\s?```/', '', $text);
                }

                return trim($text);
            }

            Log::error('Gemini API Error: ' . $response->body());
            return "Protocol Interruption. Neural network unreachable.";
        } catch (\Exception $e) {
            Log::error('Gemini Service Exception: ' . $e->getMessage());
            return "System Failure. Connection to Core AI lost.";
        }
    }
}
