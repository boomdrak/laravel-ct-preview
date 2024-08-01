<?php

namespace Tests\API;

use Tests\TestCase;

class GetTodosByAPITest extends TestCase
{
    // use RefreshDatabase;

    public function test_get_todos_by_api(): void
    {

        $loginData = ['email' => 'test@test.com', 'password' => '12345678'];
        $response = $this->json('POST', 'api/login', $loginData, ['Accept' => 'application/json']);

        $token = $response['access_token'];

        $headers = [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer '.$token,
        ];

        $response = $this->getJson('api/todo', $headers);
        $response->assertOk();

        $response->assertJsonStructure([
            'success',
            'message',
            'valid',
            'todos' => [],
        ]);
    }
}
