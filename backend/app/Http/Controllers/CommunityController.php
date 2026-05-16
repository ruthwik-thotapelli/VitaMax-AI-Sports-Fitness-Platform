<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
    public function index()
    {
        return Post::with(['user:id,name', 'comments.user:id,name'])
            ->withCount('likes')
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'media_url' => 'nullable|string',
        ]);

        $post = $request->user()->posts()->create([
            'content' => $request->content,
            'media_url' => $request->media_url,
        ]);

        return response()->json($post->load('user:id,name'));
    }

    public function like(Request $request, Post $post)
    {
        $post->likes()->toggle($request->user()->id);
        return response()->json(['likes_count' => $post->likes()->count()]);
    }

    public function comment(Request $request, Post $post)
    {
        $request->validate(['content' => 'required|string']);
        
        $comment = $post->comments()->create([
            'user_id' => $request->user()->id,
            'content' => $request->content,
        ]);

        return response()->json($comment->load('user:id,name'));
    }
}
