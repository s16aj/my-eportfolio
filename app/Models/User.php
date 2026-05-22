<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password', 'role'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */

    // HasApiTokens allows the user to create API tokens for login
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Cast attributes to the correct type.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',

            // Laravel will automatically hash the password
            'password' => 'hashed',
        ];
    }
}