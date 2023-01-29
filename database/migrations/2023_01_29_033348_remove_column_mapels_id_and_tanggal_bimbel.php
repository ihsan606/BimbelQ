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
        Schema::table('jadwal_bimbels', function (Blueprint $table) {
            $table->dropForeign(['mapels_id']);
            $table->dropColumn('mapels_id');
            $table->dropColumn('tanggal_bimbel');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('jadwal_bimbels', function (Blueprint $table) {
            //
        });
    }
};
