<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function Logout(Request $Request)
    {
        $Request->user()->currentaccessToken()->delete();


        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'deconnexion reussie'
        ]);
    }
}
