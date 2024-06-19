<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BingoItem extends Model
{
    use HasFactory;
    // no timestamps
    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'icon_b64',
        'card_id',
    ];

    public function card()
    {
        return $this->belongsTo(Card::class);
    }

    public function localSessions()
    {
        return $this->belongsToMany(LocalSession::class);
    }
}
