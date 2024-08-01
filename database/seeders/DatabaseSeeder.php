<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory([
            'name' => 'Kenneth Hauklien',
            'password' => bcrypt('12345678'),
            'email' => 'test@test.com',
        ])->create();

        $this->call(TodoSeeder::class);

    }
}
