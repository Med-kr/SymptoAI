<?php

namespace App\Http\Controllers;

use App\Models\Symptom;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSymptomRequest;
use OpenApi\Attributes as OA;

class SymptomController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    #[OA\Get(
        path: '/symptoms',
        summary: 'Get all symptoms for the authenticated user',
        security: [['sanctum' => []]],
        tags: ['Symptoms'],
        responses: [
            new OA\Response(response: 200, description: 'List of user symptoms'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Symptoms not found'),
        ]
    )]

    public function index(Request $request)
    {
        $symptoms = $request->user()->symptoms()->get();

        return response()->json([
            'success' => true,
            'data' => [
                'symptoms' => $symptoms,
            ],
            'message' => 'liste avec succes',
        ]);
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

    #[OA\Post(
        path: '/symptoms',
        summary: 'Create a new symptom',
        security: [['sanctum' => []]],
        tags: ['Symptoms'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['name', 'severity', 'date_recorded'],
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'itches'),
                    new OA\Property(property: 'severity', type: 'string', enum:['mild', 'moderate', 'severe'], example: 'mild'),
                    new OA\Property(property: 'description', type: 'string', example: '.....'),
                    new OA\Property(property: 'date_recorded', type: 'string', format:'date' , example: '2020-03-12'),
                    new OA\Property(
                    property: 'notes',
                    type: 'array',
                    items: new OA\Items(
                        type: 'string',
                        example: 'I carried it for a week, it gets stronger'
                    )
                ),
                ],
            ),
        ),

        responses: [
            new OA\Response(response: 201, description: 'Symptom created'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]
    public function store(StoreSymptomRequest $request)
    {
        $data = $request->validated();
        $symptom = $request->user()->symptoms()->create([
            'name' => $data['name'],
            'severity' => $data['severity'],
            'description' => $data['description'],
            'date_recorded' => $data['date_recorded'],
            'note' => $data['note']
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'symptom' => $symptom,
            ],
            'message' => 'symptom cree avec succes',
        ], 201);
    }


    /**
     * Display the specified resource.
     *
     */

    #[OA\Get(
        path: '/symptoms/{symptom}',
        summary: 'Get one symptoms for the authenticated user',
        security: [['sanctum' => []]],
        tags: ['Symptoms'],
        parameters: [
            new OA\Parameter(name: 'symptom', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'List of user symptoms'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Symptoms not found'),
        ]
    )]

    public function show(Request $request, Symptom $symptom, $id)
    {
        /*dd([
            'auth_user_id' => $request->user()->id,
            'symptom_user_id' => $symptom->user_id,
        ]);*/

        $symptom = $request->user()->symptoms()->findOrFail($id);

        /*if ($request->user()->id != $symptom->user_id)
        {
            return response()->json([
                'success' => false,
                'message' => 'forbidden',
            ], 403);
    }*/


        return response()->json([
            'success' => true,
            'data' => [
                'symptoms' => $symptom,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Symptom $symptom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    #[OA\Put(
        path: '/symptoms/{symptom}',
        summary: 'Update a symptom',
        security: [['sanctum' => []]],
        tags: ['Symptoms'],
        parameters: [
            new OA\Parameter(name: 'symptom', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        requestBody: new OA\RequestBody(
            required: false,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'itches'),
                    new OA\Property(property: 'severity', type: 'string', enum:['mild', 'moderate', 'severe'], example: 'mild'),
                    new OA\Property(property: 'description', type: 'string', example: '.....'),
                    new OA\Property(property: 'date_recorded', type: 'string', format:'date' , example: '2020-03-12'),
                    new OA\Property(
                    property: 'notes',
                    type: 'array',
                    items: new OA\Items(
                        type: 'string',
                        example: 'I carried it for a week, it gets stronger'
                    )
                ),
                ],
            ),
        ),

        responses: [
            new OA\Response(response: 201, description: 'Symptom Updated'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]

    public function update(StoreSymptomRequest $request, $id)
    {
        $symptom = $request->user()->symptoms()->findOrFail($id);

        $data = $request->validated();
        /*([
            'name' => $data['name'],
            'severity' => $data['severity'],
            'description' => $data['description'],
            'date_recorded' => $data['date'],
            'note' => $data['note']
        ]);*/

        $symptom->update($data);

        return response()->json([
            'success' => true,
            'data' => [
                'symptom' => $symptom,
            ],
            'message' => 'the symtopm updated with sucess',
        ], 200);
    }



    /**
     * Remove the specified resource from storage.
     */

    #[OA\Delete(
        path: '/symptoms/{symptom}',
        summary: 'Get one symptoms for the authenticated user',
        security: [['sanctum' => []]],
        tags: ['Symptoms'],
        parameters: [
            new OA\Parameter(name: 'symptom', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'List of user symptoms'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'Symptoms not found'),
        ]
    )]

    public function destroy(StoreSymptomRequest $request, $id)
    {
        $symptom = $request->user()->symptoms()->findOrFail($id);

        $symptom->delete();

        return response()->json([
            'success' => true,
            'message' => 'the symptoms removed succefully',
        ], 200);

    }
}
