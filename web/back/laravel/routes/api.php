<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\WordController;

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('logout', [UserController::class, 'logout']);
    Route::post('update-profile', [UserController::class, 'updateProfile']);
    Route::get('user-profile', [UserController::class, 'userProfile']);
    Route::post('create-category', [CategoryController::class, 'createCategory']);
    Route::get('list-categories', [CategoryController::class, 'listCategories']);
    Route::post('create-word', [WordController::class, 'createWord']);
    Route::post('list-words', [WordController::class, 'listWords']);
});
