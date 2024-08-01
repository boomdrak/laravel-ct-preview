<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Util\BaseResponse;

class TodoController extends Controller
{
    public function get_all()
    {
        $auth = auth('sanctum')->check();
        if (! $auth) {
            return response()->json(BaseResponse::invalid(), 401);
        }

        $user = auth('sanctum')->user();
        $todos = Todo::with('user')->orderBy('created_at', 'desc')->get();
        // Todo::with('user')->get()->orderBy("date_created");

        $baseResponse = BaseResponse::ok();
        $baseResponse['message'] = 'List of all todos';
        $baseResponse['todos'] = $todos;

        return response()->json($baseResponse, 200);
    }

    public function update(Request $request)
    {
        $auth = auth('sanctum')->check();
        if (! $auth) {
            return response()->json(BaseResponse::invalid(), 401);
        }

        $content = $request->all();
        $todoInputArray = json_decode($request->getContent(), true);
        $rules = [
            'task_name' => 'required|string|max:255',
            'task_description' => 'required|string|max:255',
            'task_completed' => 'required|boolean',
        ];

        $validator = Validator::make($todoInputArray, $rules);
        if (! $validator->passes()) {

            $brObject = BaseResponse::invalid();
            $brObject['message'] = $validator->errors()->all();

            return response()->json($brObject, 401);
        }

        $todoObjet = Todo::find($todoInputArray['id']);

        if ($todoObjet) {
            $todoObjet->task_name = $todoInputArray['task_name'];
            $todoObjet->task_description = $todoInputArray['task_description'];
            $todoObjet->task_completed = $todoInputArray['task_completed'];
            $todoObjet->save();
            $baseResponse = BaseResponse::ok();
            $baseResponse['message'] = 'Task updated!';

            return response()->json($baseResponse, 200);
        } else {
            $brObject = BaseResponse::invalid();
            $brObject['message'] = 'Could not find and update task id: '.$request->id;

            return response()->json($brObject, 401);
        }
    }

    public function create(Request $request)
    {
        $auth = auth('sanctum')->check();

        if (! $auth) {
            return response()->json(BaseResponse::invalid(), 401);
        }
        $user = auth('sanctum')->user();

        $content = $request->all();
        $todoInputArray = json_decode($request->getContent(), true);
        $rules = [
            'task_name' => 'required|string|max:255',
            'task_description' => 'required|string|max:255',
        ];

        $validator = Validator::make($todoInputArray, $rules);
        if (! $validator->passes()) {

            $brObject = BaseResponse::invalid();
            $brObject['message'] = $validator->errors()->all();

            return response()->json($brObject, 401);
        }

        $todoObjet = new Todo();
        $todoObjet->user_id = $user->id;
        $todoObjet->task_name = $todoInputArray['task_name'];
        $todoObjet->task_description = $todoInputArray['task_description'];
        $todoObjet->task_completed = false;
        $todoObjet->save();
        $baseResponse = BaseResponse::ok();
        $baseResponse['message'] = 'Task created!';
        $baseResponse['todo'] = $todoObjet;

        return response()->json($baseResponse, 200);
    }

    public function delete(Request $request)
    {
        $auth = auth('sanctum')->check();

        if (! $auth) {
            return response()->json(BaseResponse::invalid(), 401);
        }
        $user = auth('sanctum')->user();

        $content = $request->all();
        $todoInputArray = json_decode($request->getContent(), true);
        $rules = [
            'id' => 'required|integer',
        ];

        $validator = Validator::make($todoInputArray, $rules);
        if (! $validator->passes()) {

            $brObject = BaseResponse::invalid();
            $brObject['message'] = $validator->errors()->all();

            return response()->json($brObject, 401);
        }

        $todoObjet = Todo::find($todoInputArray['id']);
        if ($todoObjet) {
            $todoObjet->delete();
            $baseResponse = BaseResponse::ok();
            $baseResponse['message'] = 'Task deleted!';

            return response()->json($baseResponse, 200);
        } else {
            $brObject = BaseResponse::invalid();
            $brObject['message'] = 'Cloud not find the todo you wanted to delete, by id: '.$todoInputArray['id'];

            return response()->json($brObject, 401);
        }

    }
}
