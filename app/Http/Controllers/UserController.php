<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Mail\gmail;
use App\Models\User;
use App\Events\UserCreated;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCRUDResource;
use App\Interfaces\MessageSender;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    // public  $emailService;
    // public function __construct(MessageSender $emailService) {
    //     $this->emailService = $emailService;
    // }

    public function index()
    {
       // $this->emailService->send('msa.ansari28@gmail.com','Email send to this user');

    //    $emailService = app(MessageSender::class)->get('email');
    //    $smsService = app(MessageSender::class)->get('sms');

    //    $emailService->send('msa.ansari28@gmail.com','welcome');
    //    $smsService->send('789652413','welcome sms');

        
        $getQueryData = User::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction","desc");

        if(request("name")){
            $getQueryData->where("name","like","%". request("name"). "%");
        }

        if(request("email")){
            $getQueryData->where("email","like","%". request("email"). "%");
        }

        $users = $getQueryData->orderBy($sortField, $sortDirection)->paginate(10); //->onEachSide(1);

        return inertia("User/Index",[
            "users" => UserCRUDResource::collection($users),
            "queryParams" => request()->query() ? : null,
            "success" => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] =  Carbon::now();
        $data['password'] = bcrypt($data['password']);

        // Event & Listeners
        $newUser = User::create($data);
        event(new UserCreated($newUser));

        return to_route('user.index')->with('success','User was created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit',[
            'user' => new UserCRUDResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        $data['email_verified_at'] = Carbon::now();
        if($password){
            $data['password'] = bcrypt($password);
        }else{
            unset($data['password']);
        }
        $user->update($data);

        return to_route('user.index')->with('success', "User \" $user->name \" was updated ");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();

        return to_route('user.index')->with('success',"User \" $name \" was deleted successfully!");
    }
}
