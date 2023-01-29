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
        Schema::create('jadwal_bimbels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('siswas_id');
            $table->unsignedBigInteger('sesis_id');
            $table->unsignedBigInteger('programs_x_kelas_id');
            // $table->unsignedBigInteger('mapels_id');
            $table->unsignedBigInteger('tentor_id');
            // $table->date('tanggal_bimbel');
            $table->timestamps();

            $table->foreign('siswas_id')->references('id')->on('siswas');
            $table->foreign('sesis_id')->references('id')->on('sesis');
            $table->foreign('programs_x_kelas_id')->references('id')->on('programs_x_kelas');
            // $table->foreign('mapels_id')->references('id')->on('mapels');
            $table->foreign('tentor_id')->references('id')->on('tentors');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jadwal_bimbels');
    }
};
