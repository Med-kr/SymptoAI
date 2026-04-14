<?php

namespace App\Http\Controllers;

use App\Models\AiAdvice;
use Illuminate\Http\Request;
use App\models\Symptom;
use Illuminate\Support\Facades\Http;
use OpenApi\Attributes as OA;
class AiAdviceController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    #[OA\Post(
        path: '/ai/health-advice',
        summary: 'Get ai Health advice',
        security: [['sanctum' => []]],
        tags: ['AI'],
        responses: [
            new OA\Response(response: 200, description: 'List of user symptoms'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Symptoms not found'),
        ]
    )]

     #[OA\Get(
        path: '/ai/last-advice',
        summary: 'retrieve The latest advice',
        security: [['sanctum' => []]],
        tags: ['AI'],
        responses: [
            new OA\Response(response: 200, description: 'List of user symptoms'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Symptoms not found'),
        ]
    )]

    public function index(Request $request)
    {
        $user = $request->user();
        $symptom = $user->symptoms()->take(3)->pluck('name')->implode(',');

        $prompt = "User symptoms: {$symptom}";

        $response = Http::post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=' . env('GEMINI_API_KEY'),
            [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]
        );

        if($response->successful())
        {
            $output = $response->json()['candidates'][0]['content']['parts'][0]['text'];
            /*return response()->json([
                'data' => $output,
            ], 200);*/#endregion
        } else {
                return response()->json([
                    'succes' => false,
                    'message' => "echec",
                ], 200);
        }

        AiAdvice::create([
            'advice' => $output,
            'user_id' => auth()->user()->id(),

        ]);
        return response()->json([
            'success' => true,
            'data' => $output,
            'message' => 'successful',
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AiAdvice $aiAdvice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AiAdvice $aiAdvice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AiAdvice $aiAdvice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AiAdvice $aiAdvice)
    {
        //
    }
}
