<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create 20 random users for the leaderboard
        User::factory(20)->create();

        // Create 5 trainers
        User::factory(5)->trainer()->create();

        // Create a specific test user
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'user',
            'xp' => 5000,
            'level' => 25,
            'streak' => 12,
        ]);

        // Create a specific trainer
        $trainer = User::factory()->create([
            'name' => 'Elite Trainer',
            'email' => 'trainer@example.com',
            'role' => 'trainer',
        ]);

        // Create some hero posts for the community
        $testUser->posts()->create([
            'content' => 'Just completed the Neural Hypertrophy protocol. Metabolic efficiency up by 12%! 🔥 #Vitamax #LevelUp',
        ]);

        $trainer->posts()->create([
            'content' => 'New Combat Conditioning module is live. Prepare for peak VO2 Max results. Synchronize now. 🥊',
        ]);

        User::factory(5)->create()->each(function ($u) {
            $u->posts()->create([
                'content' => 'Consistency is the only protocol that matters. 🦾 #EliteFitness',
            ]);
        });
    }
}
