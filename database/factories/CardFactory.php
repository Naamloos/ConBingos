<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Card>
 */
class CardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $image = UploadedFile::fake()->image('logo.jpg')->get();
        $imageb64 = 'data:image/jpeg;base64,' . base64_encode($image);
        return [
            'name' => $this->faker->name,
            'description' => $this->faker->text,
            'logo_type' => 'icon',
            'width' => $this->faker->randomNumber(),
            'height' => $this->faker->randomNumber(),
            'user_id' => \App\Models\User::factory(),
        ];
    }
}
