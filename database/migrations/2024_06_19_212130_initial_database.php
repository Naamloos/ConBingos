<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->longText('logo_b64')->nullable();

            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Creator ID
        });

        Schema::create('bingo_items', function (Blueprint $table) {
            $table->id();

            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->longText('icon_b64')->nullable();

            $table->foreignId('card_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cards');
        Schema::dropIfExists('bingo_items');
    }
};
