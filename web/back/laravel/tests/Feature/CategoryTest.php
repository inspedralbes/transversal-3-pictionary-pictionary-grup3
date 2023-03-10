<?php

namespace Tests\Feature;

use Tests\TestCase;

class CategoryTest extends TestCase
{

    public function testCreateCategory(): void
    {
        $token = "9|rWOYH1OtWIMQWI3kwDJ6cpmSjPmJVKgwd5mcjuZT";
        $response = $this->withHeaders(['Authorization' => "Bearer " . $token])->post(
            '/api/create-category',
            [
                "idUser" => "1",
                "category" => "Test category"
            ]
        );
        $response->assertStatus(201);
    }

    public function testListCategories(): void
    {
        $token = "9|rWOYH1OtWIMQWI3kwDJ6cpmSjPmJVKgwd5mcjuZT";
        $response = $this->withHeaders(['Authorization' => "Bearer " . $token])->get('/api/list-categories');
        $response->assertStatus(200);
        $response->assertJsonFragment(["category" => "Test category"]);
    }
}
