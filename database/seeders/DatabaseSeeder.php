<?php

namespace Database\Seeders;

use App\Models\BingoItem;
use App\Models\Card;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Ryan',
            'email' => 'ryandejonge@outlook.com',
            'password' => bcrypt('password'),
        ]);

        $card = new Card(
            [
                'name' => 'Test Card',
                'description' => 'This is a test card',
                'logo_b64' => ' data:image/png;base64,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',
                'user_id' => 1,
            ]
        );
        $card->save();

        // generate 24 bingo items
        for ($i = 0; $i < 12; $i++) {
            $bingoItem = new BingoItem(
                [
                    'title' => 'Test Bingo Item ' . $i,
                    'description' => 'This is a test bingo item',
                    'icon_b64' => ' data:image/png;base64,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',
                    'card_id' => $card->id,
                ]
            );
            $bingoItem->save();
        }

        $bingoItem = new BingoItem(
            [
                'title' => 'FREE',
                'description' => 'Free Space.',
                'card_id' => $card->id,
            ]
        );
        $bingoItem->save();

        for ($i = 0; $i < 12; $i++) {
            $bingoItem = new BingoItem(
                [
                    'title' => 'Test Bingo Item ' . $i,
                    'description' => 'This is a test bingo item',
                    'icon_b64' => ' data:image/png;base64,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',
                    'card_id' => $card->id,
                ]
            );
            $bingoItem->save();
        }
    }
}
