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
        Schema::create('tentors_x_mapels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tentor_id');
            $table->unsignedBigInteger('mapel_id');
            $table->foreign('tentor_id')->references('id')->on('tentors');
            $table->foreign('mapel_id')->references('id')->on('mapels');

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
        Schema::dropIfExists('tentors_x_mapels');
    }
};
