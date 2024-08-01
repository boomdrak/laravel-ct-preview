<?php

namespace Tests\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginUserByAPITest extends TestCase
{
    // use RefreshDatabase;

    public function test_login_user_by_api(): void
    {
        $loginData = ['email' => 'test@test.com', 'password' => '12345678'];
        $response = $this->json('POST', 'api/login', $loginData, ['Accept' => 'application/json']);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'access_token',
            'user' => [
                'id',
                'name',
                'email',
                'email_verified_at',
                'created_at',
                'updated_at',
            ],
        ]);
    }
}
