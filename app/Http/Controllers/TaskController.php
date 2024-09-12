<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Str;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTaskRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Trait\ImageUpload;

class TaskController extends Controller
{

    use ImageUpload;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $getQueryData = Task::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction","desc");

        if(request("name")){
            $getQueryData->where("name","like","%". request("name"). "%");
        }

        if(request("status")){
            $getQueryData->where("status", request("status"));
        }

        $tasks = $getQueryData->orderBy($sortField, $sortDirection)->paginate(10); //->onEachSide(1);

        return inertia("Task/Index",[
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ? : null,
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name','asc')->get();
        $users = User::all();

        return inertia("Task/Create",[
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        $uploadDirPath = 'task/uploads';
        $data['image_path'] = $this->uploadImage($image,$uploadDirPath);

        $task = Task::create($data);

        return to_route('task.index')->with('success',"Task \" $task->name \" was created successfully!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia("Task/Show",[
            "task" => new TaskResource($task)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name','asc')->get();
        $users = User::query()->orderBy('name','asc')->get();

        return inertia('Task/Edit',[
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
            /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        $uploadDirPath = 'task/uploads';
        $currentImage = $task->image_path;
        $data['image_path'] = $this->updateImage($currentImage,$image,$uploadDirPath);
        

        $task->update($data);

        return to_route('task.index')->with('success', "Task \" $task->name \" was updated ");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();

        $currentImage = $task->image_path;
        $this->deleteImage($currentImage);


        return to_route('task.index')->with('success',"Task \" $name \" was deleted");
    }

    public function myTasks()
    {
        $user = auth()->user();
        $getQueryData = Task::query()->where('assigned_user_id',$user->id);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction","desc");

        if(request("name")){
            $getQueryData->where("name","like","%". request("name"). "%");
        }

        if(request("status")){
            $getQueryData->where("status", request("status"));
        }

        $tasks = $getQueryData->orderBy($sortField, $sortDirection)->paginate(10); //->onEachSide(1);

        return inertia("Task/Index",[
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ? : null,
            "success" => session('success'),
        ]);
    }

    // Controller End here...
}
