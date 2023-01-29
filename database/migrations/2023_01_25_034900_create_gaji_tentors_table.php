<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gaji_tentors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tentors_id');
            $table->integer('total_gaji');
            $table->string('bulan');
            $table->timestamps();

            $table->foreign('tentors_id')->references('id')->on('tentors');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gaji_tentors');
    }
};
