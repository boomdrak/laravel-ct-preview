<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        //# CREATE NEW USER THAT WE WILL BE TESTING WITH
        $user = User::where(['email' => 'test@example.com']);
        if (! $user) {
            $user = User::factory()->create([
                'email' => 'test@test.com',
                'password' => Hash::make('12345678'),
            ]);
        }
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
