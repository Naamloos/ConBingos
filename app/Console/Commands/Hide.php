<?php

namespace App\Console\Commands;

use App\Models\Card;
use Illuminate\Console\Command;

class hide extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bingo:hide {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '(un)hides a card';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $card = Card::findOrFail($this->argument('id'));
        $card->hidden = !$card->hidden;
        $card->save();
        $card->refresh();
        $this->info('Card ' . $card->name . ' is now ' . ($card->hidden ? 'hidden' : 'visible') . '.');
    }
}
