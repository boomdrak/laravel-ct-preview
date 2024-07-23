<?php

namespace Tests\Feature;

use Tests\TestCase;

class HasAllDatabaseTablesTest extends TestCase
{
    public function test_has_all_database_tables(): void
    {
        $tables = [
            'users',
            'todo',
            'password_reset_tokens',
            'sessions'
        ];

        foreach($tables as $table) {
            $this->assertTrue(\Illuminate\Support\Facades\Schema::hasTable($table));
        }
    }
}