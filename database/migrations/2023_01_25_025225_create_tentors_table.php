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
        Schema::create('tentors', function (Blueprint $table) {
            $table->id();
            $table->string('tentors_name');
            $table->string('tentors_email');
            $table->string('tentors_phone_number');
            $table->unsignedBigInteger('mapels_id');
            $table->unsignedBigInteger('sesi_id');
            // $table->timestamp('tentors_email_verified_at')->nullable();
            // $table->string('tentors_password');
            // $table->rememberToken();
            $table->timestamps();

            $table->foreign('mapels_id')->references('id')->on('mapels');
            $table->foreign('sesi_id')->references('id')->on('sesis');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tentors');
    }
};
