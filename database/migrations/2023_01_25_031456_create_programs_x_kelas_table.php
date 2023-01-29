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
        Schema::create('programs_x_kelas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('programs_id');
            $table->unsignedBigInteger('kelas_id');
            $table->integer('tarif_belajar');
            $table->integer('tarif_tentor');
            $table->timestamps();
            
            $table->foreign('programs_id')->references('id')->on('programs');
            $table->foreign('kelas_id')->references('id')->on('kelas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programs_x_kelas');
    }
};
