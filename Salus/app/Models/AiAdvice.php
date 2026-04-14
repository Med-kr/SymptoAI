<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiAdvice extends Model
{
    protected $fillable = [
        'user_id',
        'advice',
        // 'symptoms_snapshot',
        //'generated'
    ];

    protected $casts = [
        'adivce' => 'string',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);

    }
}

