<?php

namespace App\Http\Controllers;


use App\Models\Project;
use Illuminate\Support\Str;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Trait\ImageUpload;
use App\helper\helpers;

class ProjectController extends Controller
{

    use ImageUpload;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $getQueryData = Project::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction","desc");

        if(request("name")){
            $getQueryData->where("name","like","%". request("name"). "%");
        }

        if(request("status")){
            $getQueryData->where("status", request("status"));
        }

        $projects = $getQueryData->orderBy($sortField, $sortDirection)->paginate(10); //->onEachSide(1);

        // get user email from hepler file
       // $email = user_email();

        return inertia("Project/Index",[
            "projects" => ProjectResource::collection($projects),
            "queryParams" => request()->query() ? : null,
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        // Using Trait to Upload IMage
        $uploadDirPath = 'project/uploads';
        $data['image_path'] = $this->uploadImage($image,$uploadDirPath);

        // if ($image) {
        //     $randomString = Str::random();  
        //     $imageName = $randomString . '.' . $image->getClientOriginalExtension(); 
        //     $data['image_path'] = $image->storeAs('project/uploads', $imageName, 'public');
        // }

        $project = Project::create($data);

        return to_route('project.index')->with('success',"Project \" $project->name \" was created successfully!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $taskQuery = $project->tasks();
        
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction","desc");

        if(request("name")){
            $taskQuery->where("name","like","%". request("name"). "%");
        }

        if(request("status")){
            $taskQuery->where("status", request("status"));
        }

        $tasks = $taskQuery->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia("Project/Show",[
            "project" => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ? : null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit',[
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
       
        $data = $request->validated();
          /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        $uploadDirPath = 'project/uploads';
        $currentImage = $project->image_path;
        $data['image_path'] = $this->updateImage($currentImage,$image,$uploadDirPath);

        // if ($image) {

        //     if($project->image_path){
        //         Storage::disk('public')->delete($project->image_path);
        //     }    
        //     $imageName = Str::random() . '.' . $image->getClientOriginalExtension();
        //     $data['image_path'] = $image->storeAs('project/uploads', $imageName, 'public');

        // } else {
        //     $data['image_path'] = $project->image_path;
        // }

        $project->update($data);

        return to_route('project.index')->with('success', "Project \" $project->name \" was updated ");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;

        $project->delete();
        $currentImage = $project->image_path;
        $this->deleteImage($currentImage);
        // if($project->image_path){
        //     Storage::disk('public')->delete($project->image_path);
        // }  
        return to_route('project.index')->with('success',"Project \" $name \" was deleted");
    }
}
