<?php

namespace Tests\API;

use App\Models\User;
use Illuminate\Support\Str;
use Tests\TestCase;

class CreateNewUserByAPITest extends TestCase
{
    //# use RefreshDatabase;

    public function test_create_new_user_by_api(): void
    {
        $faker = \Faker\Factory::create();
        $fakerEmail = $faker->email;
        $response = $this->post('/api/register', [
            'name' => $faker->name,
            'email' => $faker->email,
            'password' => bcrypt(Str::password(16, true, true, false, false)),
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'user' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ],
        ]);

        $userObj = User::where(['email' => $fakerEmail]);
        $userObj->delete();

        $this->assertDatabaseMissing('users', [
            'email' => $fakerEmail,
        ]);
    }
}
