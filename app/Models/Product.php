<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'author',
        'description',
        'price',
        'cover_image_path',
    ];
}
