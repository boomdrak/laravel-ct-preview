<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

class CreateNewUserByModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_new_user_by_model(): void
    {
        $faker = \Faker\Factory::create();
        $name = User::factory([
                    'name' => $faker->name,
                    'password' => bcrypt(Str::password(16, true, true, false, false)),
                    'email' =>'test_create_user@db.level'
                    ])->create();

        $this->assertDatabaseHas('users', [
            'email' => 'test_create_user@db.level',
        ]);
    }
}