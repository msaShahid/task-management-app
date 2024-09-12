<?php

use Illuminate\Support\Facades\Auth;

if(!function_exists('user_email')){
    function user_email(){
        $user = Auth::user();
        return $user->email;
    }
}

if(!function_exists('dateFormat')){
    function dateFormat(){
        
    }
}

