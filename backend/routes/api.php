<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/oauth/simulate', [AuthController::class, 'simulateOAuth']); // Keep for backward compatibility if needed
Route::get('/oauth/{provider}', [AuthController::class, 'redirectToProvider']);
Route::get('/oauth/{provider}/callback', [AuthController::class, 'handleProviderCallback']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Workouts
    Route::get('/workouts', [\App\Http\Controllers\WorkoutController::class, 'index']);
    Route::post('/workouts/generate', [\App\Http\Controllers\WorkoutController::class, 'generate']);
    Route::post('/workouts/{workout}/complete', [\App\Http\Controllers\WorkoutController::class, 'complete']);

    // Nutrition
    Route::get('/nutrition', [\App\Http\Controllers\NutritionController::class, 'index']);
    Route::post('/nutrition/generate', [\App\Http\Controllers\NutritionController::class, 'generate']);

    // Gamification
    Route::get('/gamification', [\App\Http\Controllers\GamificationController::class, 'index']);
    Route::post('/badges/award', [\App\Http\Controllers\GamificationController::class, 'awardBadge']);

    // Community
    Route::get('/community', [\App\Http\Controllers\CommunityController::class, 'index']);
    Route::post('/community/posts', [\App\Http\Controllers\CommunityController::class, 'store']);
    Route::post('/community/posts/{post}/like', [\App\Http\Controllers\CommunityController::class, 'like']);
    Route::post('/community/posts/{post}/comment', [\App\Http\Controllers\CommunityController::class, 'comment']);

    // Schedule
    Route::get('/schedule', [\App\Http\Controllers\ScheduleController::class, 'index']);
    Route::get('/trainers', [\App\Http\Controllers\ScheduleController::class, 'trainers']);
    Route::post('/bookings', [\App\Http\Controllers\ScheduleController::class, 'store']);

    // Chat
    Route::post('/chat/ask', [\App\Http\Controllers\ChatController::class, 'ask']);

    // Command Center
    Route::get('/command-center', [\App\Http\Controllers\CommandCenterController::class, 'index']);

    // Overview / Stat Hub
    Route::get('/overview', [\App\Http\Controllers\OverviewController::class, 'index']);
});
