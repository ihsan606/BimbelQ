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
            $table->integer('tentor_id');
            $table->integer('jadwal_bimbel_id');
            $table->boolean('absensi_status');
            $table->time('jam_masuk');
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
        Schema::dropIfExists('tentor_absensis');
    }
};
