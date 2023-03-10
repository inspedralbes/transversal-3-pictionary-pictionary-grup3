<?php

namespace Tests\Feature;

use Tests\TestCase;

class UserTest extends TestCase
{

    public function testRegister(): void
    {
        $response = $this->post(
            '/api/register',
            [
                "username" => "username_test",
                "email" => "test@inspedralbes.cat",
                "password" => "password_test",
                "password_confirmation" => "password_test"
            ]
        );
        $response->assertStatus(201);
    }

    public function testLogin(): void
    {
        $response = $this->post(
            '/api/login',
            [
                "username" => "username_test",
                "password" => "password_test"
            ]
        );
        $response->assertStatus(200);
        $response->assertJsonFragment(["login" => false]);
    }

    public function testLogout(): void
    {
        $token = "9|rWOYH1OtWIMQWI3kwDJ6cpmSjPmJVKgwd5mcjuZT";
        $response = $this->withHeaders(
            [
                'Authorization' => "Bearer " . $token
            ]
        )->get('/api/logout');
        $response->assertStatus(200);
    }

    public function testUpdateProfile(): void
    {
        $token = "9|rWOYH1OtWIMQWI3kwDJ6cpmSjPmJVKgwd5mcjuZT";
        $response = $this->withHeaders(['Authorization' => "Bearer " . $token])->post(
            '/api/update-profile',
            [
                "email" => "admin@inspedralbes.cat",
                "password" => "Hola1234",
                "password_confirmation" => "Hola1234",
            ]
        );
        $response->assertStatus(201);
    }

    public function testUserProfile(): void
    {
        $token = "9|rWOYH1OtWIMQWI3kwDJ6cpmSjPmJVKgwd5mcjuZT";
        $response = $this->withHeaders(['Authorization' => "Bearer " . $token])->get('/api/user-profile');
        $response->assertStatus(200);
        $response->assertJsonFragment(["username" => "admin"]);
    }
}
