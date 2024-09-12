<?php

namespace App\Providers;

use App\Interfaces\MessageSender;
use App\Services\EmailService;
use App\Services\SMSService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // app()->bind(MessageSender::class, EmailService::class);
        // app()->bind(MessageSender::class, SMSService::class);

        app()->bind(MessageSender::class, function($app){
            return collect([
                'email' => EmailService::class,
                'sms' => SMSService::class
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
    }
}
