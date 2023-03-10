<?php

namespace Tests\Feature;

use Tests\TestCase;

class WordTest extends TestCase
{

    public function testCreateWord(): void
    {
        $token = "9|rWOYH1OtWIMQWI3kwDJ6cpmSjPmJVKgwd5mcjuZT";
        $response = $this->withHeaders(['Authorization' => "Bearer " . $token])->post(
            '/api/create-word',
            [
                "idCategory" => "1",
                "word" => "Test word",
                "description" => "Test description",
                "word_ca" => "Test word ca",
                "description_ca" => "Test description ca"
            ]
        );
        $response->assertStatus(201);
    }

    public function testListWord(): void
    {
        $token = "9|rWOYH1OtWIMQWI3kwDJ6cpmSjPmJVKgwd5mcjuZT";
        $response = $this->withHeaders(['Authorization' => "Bearer " . $token])->post(
            '/api/list-words',
            [
                "idCategory" => 1
            ]
        );
        $response->assertStatus(200);
        $response->assertJsonFragment(["word" => "Test word"]);
    }
}
