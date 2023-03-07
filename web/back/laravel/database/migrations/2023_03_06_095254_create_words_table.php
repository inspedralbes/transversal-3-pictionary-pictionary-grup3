<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('words', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idCategory');
            $table->string('word');
            $table->string('description');
            $table->string('word_ca');
            $table->string('description_ca');
            $table->timestamps();
            $table->foreign('idCategory')->references('id')->on('categories');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('words');
    }
};
