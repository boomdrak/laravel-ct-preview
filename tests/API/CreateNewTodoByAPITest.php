<?php

namespace Tests\API;

use Tests\TestCase;

class CreateNewTodoByAPITest extends TestCase
{
    // use RefreshDatabase;

    public function test_create_new_todo_by_api(): void
    {

        $loginData = ['email' => 'test@test.com', 'password' => '12345678'];
        $response = $this->json('POST', 'api/login', $loginData, ['Accept' => 'application/json']);

        $token = $response['access_token'];

        $headers = [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer '.$token,
        ];

        $body = [
            'task_name' => 'testing',
            'task_description' => 'desc',
        ];
        $response = $this->postJson('api/todo', $body, $headers);
        $response->assertOk();
    }
}
