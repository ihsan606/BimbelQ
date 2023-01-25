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
        Schema::create('tentor_absensis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tentor_id');
            $table->unsignedBigInteger('jadwal_bimbel_id');
            $table->boolean('absensi_status');
            $table->time('jam_masuk');
            $table->timestamps();


            $table->foreign('tentor_id')->references('id')->on('tentors');
            $table->foreign('jadwal_bimbel_id')->references('id')->on('jadwal_bimbels');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tentor_absensis');
    }
};
