<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        return Booking::with(['trainer:id,name', 'user:id,name'])
            ->where('user_id', $request->user()->id)
            ->orWhere('trainer_id', $request->user()->id)
            ->get();
    }

    public function trainers()
    {
        return User::where('role', 'trainer')->get(['id', 'name', 'email']);
    }

    public function store(Request $request)
    {
        $request->validate([
            'trainer_id' => 'required|exists:users,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'trainer_id' => $request->trainer_id,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'status' => 'scheduled',
        ]);

        return response()->json($booking->load('trainer:id,name'));
    }
}
