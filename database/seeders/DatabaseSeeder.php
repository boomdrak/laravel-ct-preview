<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::where(['email' => 'test@test.com']);
        if (! $user) {
            $newUser = new User;
            $newUser->email = 'test@test.com';
            $newUser->name = 'Kenneth';
            $newUser->password = Hash::make('12345678');
            $newUser->save();
        }

        $this->call(TodoSeeder::class);

    }
}
