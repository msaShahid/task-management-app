<?php

namespace App\Interfaces;

interface MessageSender
{
    public function send($receipent, $message);
}
