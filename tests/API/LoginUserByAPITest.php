<?php

namespace Tests\API;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

class LoginUserByAPITest extends TestCase
{
    use RefreshDatabase;

    public function test_login_user_by_api(): void
    {
        $faker = \Faker\Factory::create();
        $name = User::factory([
                    'name' => $faker->name,
                    'password' => bcrypt('12345678'),
                    'email' =>'test@test.com'
                    ])->create();
                    
        $response = $this->withHeaders([])->post('/api/login', [
            'email' => 'test@test.com',
            'password' => '12345678',
        ]);
 
        $response->assertStatus(200);
    }
}