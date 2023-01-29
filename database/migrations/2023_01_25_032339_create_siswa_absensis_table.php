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
        Schema::create('siswa_absensis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('siswas_id');
            $table->unsignedBigInteger('jadwal_bimbels_id');
            $table->boolean('absensi_status')->default(false);
            $table->timestamps();

            $table->foreign('siswas_id')->references('id')->on('siswas');
            $table->foreign('jadwal_bimbels_id')->references('id')->on('jadwal_bimbels');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('siswa_absensis');
    }
};
