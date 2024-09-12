<?php

namespace App\Listeners;

use App\Events\UserCreated;
use App\Mail\UserCredentials;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendUserCredentials
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserCreated $event): void
    {
        $user = $event->newUser;

        Mail::to($user->email)->send(new UserCredentials($user));
    }
}
