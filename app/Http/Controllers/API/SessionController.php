<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Util\BaseResponse;

class SessionController extends Controller
{
    public function check()
    {
        $auth = auth('sanctum')->check();

        if (! $auth) {
            return response()->json(BaseResponse::invalid(), 401);
        }

        $user = auth('sanctum')->user();
        $baseResponse = BaseResponse::ok();
        $baseResponse['message'] = 'User session is valid';
        $baseResponse['user'] = $user;

        return response()->json($baseResponse, 200);
    }

    public function logout()
    {
        $auth = auth('sanctum')->check();

        if (! $auth) {
            return response()->json(BaseResponse::invalid(), 401);
        }

        auth('sanctum')->user()->tokens()->delete();

        $baseResponse = BaseResponse::ok();
        $baseResponse['message'] = 'logged out';

        return response()->json($baseResponse, 200);
    }
}
