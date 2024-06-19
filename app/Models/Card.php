<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class Card extends Model
{
    use HasFactory;

    // no timestamps
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'logo_b64',
        'width',
        'height',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bingoItems()
    {
        return $this->hasMany(BingoItem::class);
    }
}
