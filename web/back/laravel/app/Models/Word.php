<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Word extends Model
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'idCategory',
        'word',
        'description',
        'word_ca',
        'description_ca',
    ];
}
