<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalSession extends Model
{
    use HasFactory;
    // no timestamps
    public $timestamps = false;

    protected $fillable = [
        'key',
    ];

    public function bingoItems()
    {
        return $this->belongsToMany(BingoItem::class);
    }
}
