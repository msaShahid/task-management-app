<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){

        $user  = auth()->user();

        $totalPending = Task::query()->where('status','Pending')->count();

      //  dd($totalPending);

        return inertia('dashboard',compact('totalPending'));
    }
}
