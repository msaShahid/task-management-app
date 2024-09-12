<?php

namespace App\Services;

use App\Interfaces\MessageSender;

class SMSService implements MessageSender
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }


    public function send($receipent, $message){
        echo "SMS send to : $receipent and message : $message";
    }


}
