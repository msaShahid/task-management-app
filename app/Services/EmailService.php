<?php

namespace App\Services;

use App\Interfaces\MessageSender;

class EmailService implements MessageSender
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }


    public function send($receipent, $message){
        echo "Email send to : $receipent and message : $message";
    }


}
