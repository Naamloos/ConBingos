<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateInvite extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bingo:invite';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates an invite';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $invite = new \App\Models\Invite();
        $invite->key = \Illuminate\Support\Str::random(32);
        $invite->save();
        $this->info("Invite created: {$invite->key}");
    }
}
