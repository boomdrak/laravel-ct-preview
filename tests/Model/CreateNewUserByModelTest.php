<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class CreateNewUserByModelTest extends TestCase
{
    //use RefreshDatabase;

    public function test_create_new_user_by_model(): void
    {
        $user = User::where(['email' => 'test@test.com']);
        if ($user) {
            $newUser = new User;
            $newUser->email = 'test@test.com';
            $newUser->name = 'Kenneth';
            $newUser->password = Hash::make('12345678');
            $newUser->save();
        }

        $this->assertDatabaseHas('users', [
            'email' => 'test@test.com',
        ]);
    }
}
