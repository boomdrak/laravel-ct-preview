<?php

namespace Util;

class BaseResponse
{
    public static function ok(): array
    {
        return [
            'success' => true,
            'statusCode' => 200,
            'message' => 'Response OK',
            'valid' => true,
        ];
    }

    public static function invalid(): array
    {
        return [
            'success' => false,
            'statusCode' => 401,
            'message' => 'User session invalid',
            'valid' => false,
        ];
    }
}
