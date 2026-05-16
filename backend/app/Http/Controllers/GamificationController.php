<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GamificationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'xp' => $user->xp,
            'level' => $user->level,
            'streak' => $user->streak,
            'badges' => $user->badges()->latest()->get(),
            'leaderboard' => \App\Models\User::orderBy('xp', 'desc')->limit(5)->get(['name', 'xp', 'level'])
        ]);
    }

    public function awardBadge(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
        ]);

        $badge = $request->user()->badges()->create([
            'name' => $request->name,
            'type' => $request->type,
            'icon' => 'Trophy',
        ]);

        return response()->json($badge);
    }
}
