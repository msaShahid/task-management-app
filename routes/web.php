<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Console\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\{
    DashboardController,
    ProjectController,
    TaskController,
    UserController
};

Route::get('/', function() {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'phpVersion' => PHP_VERSION,
    ]);
});

//Route::redirect('/', '/dashboard');

Route::middleware(['auth','verified'])->group(function() {

   // Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/dashboard', [DashboardController::class,'index'])->name('dashboard');

    Route::resource('project',ProjectController::class);
    Route::get('task/worklist', [TaskController::class,'myTasks'])->name('task.worklist');
    Route::resource('task',TaskController::class);
    Route::resource('user',UserController::class);

    

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
