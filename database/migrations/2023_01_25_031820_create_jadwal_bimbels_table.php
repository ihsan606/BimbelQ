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
            $table->integer('siswas_id');
            $table->integer('sesis_id');
            $table->integer('programs_x_kelas_id');
            $table->integer('mapels_id');
            $table->integer('tentors_x_mapels_id');
            $table->date('tanggal_bimbel');
            $table->timestamps();
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
