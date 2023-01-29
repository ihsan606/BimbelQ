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
        Schema::create('tagihan_siswas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('siswas_id');
            $table->integer('total_tagihan');
            $table->string('bulan');
            $table->timestamps();

            $table->foreign('siswas_id')->references('id')->on('siswas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tagihan_siswas');
    }
};
