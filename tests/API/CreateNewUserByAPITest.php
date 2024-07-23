<?php

namespace Tests\API;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

class CreateNewUserByAPITest extends TestCase
{
    use RefreshDatabase;

    public function test_create_new_user_by_api(): void
    {
        $faker = \Faker\Factory::create();
        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->post('/api/register', [
            'name' => $faker->name,
            'email' => 'test_create_user@api.level',
            'password' => bcrypt(Str::password(16, true, true, false, false)),
        ]);
 
        $response->assertStatus(200);
    }
}