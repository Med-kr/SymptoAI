<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Http\Requests\StoreAppointmentRequest;
use OpenApi\Attributes as OA;
class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    #[OA\Get(
        path: '/appointments',
        summary: 'Get all appointments for the authenticated user',
        security: [['sanctum' => []]],
        tags: ['appointments'],
        responses: [
            new OA\Response(response: 200, description: 'List of user appointments'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'appointments not found'),
        ]
    )]

    public function index(Request $request)
    {
        $appointment = $request->user()->appointments()->get();

        return response()->json([
            'success' => true,
            'data' => [
                'appointments' => $appointment,
            ],
            'message' => 'lister avec succe'
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
        path: '/appointments',
        summary: 'Create a new appointment',
        security: [['sanctum' => []]],
        tags: ['appointments'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['appointment_date', 'doctor_id'],
                properties: [
                    new OA\Property(property: 'appointment_date', type: 'string', format:'date' , example: '2020-03-12'),
                    new OA\Property(property: 'status', type: 'string', enum:['pending','confirmed','cancelled'], example: 'pending or confirmed' ),
                    new OA\Property(property: 'doctor_id', type: 'integer' , example: '1'),
                ],
            ),
        ),

        responses: [
            new OA\Response(response: 201, description: 'Symptom created'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]

    public function store(StoreAppointmentRequest $request)
    {
        $data = $request->validated();
        $appointment = $request->user()->appointments()->create([
            'doctor_id' => $data['doctor_id'],
            'appointment_date' => $data['appointment_date'],
            'notes' => $data['notes'] ?? null,
            'status' => 'pending',
        ]);
        return response()->json([
            'success' => true,
            'data' => [
                'appointment' => $appointment,
            ],
            'message' => 'appointment cree avec succe',
        ], 201);
    }

    /**
     * Display the specified resource.
     */

    #[OA\Get(
        path: '/appointments/{appointment}',
        summary: 'Get one appointments for the authenticated user',
        security: [['sanctum' => []]],
        tags: ['appointments'],
        parameters: [
            new OA\Parameter(name: 'appointment', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'List of user appointment'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'appointment not found'),
        ]
    )]

    public function show(Request $request, $id)
    {
        $appointment = $request->user()->appointments()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'appointment' => $appointment,
            ],
            'message' => 'show appointment succefully treated',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    #[OA\Put(
        path: '/appointments',
        summary: 'Update appointment',
        security: [['sanctum' => []]],
        tags: ['appointments'],
        parameters: [
            new OA\Parameter(name: 'appointment', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['appointment_date', 'doctor_id'],
                properties: [
                    new OA\Property(property: 'appointment_date', type: 'string', format:'date' , example: '2020-03-12'),
                    new OA\Property(property: 'status', type: 'string', enum:['pending','confirmed','cancelled'], example: 'pending or confirmed' ),
                    new OA\Property(property: 'doctor_id', type: 'integer' , example: '1'),
                ],
            ),
        ),

        responses: [
            new OA\Response(response: 201, description: 'appointment Updated'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
        ]
    )]

    public function update(StoreAppointmentRequest $request, $id)
    {
        $appointment = $request->user()->appointments()->findOrFail($id);

        $data = $request->validated();
        $appointment->update($data);

        return response()->json([
            'success' => true,
            'data' => [
                'appointment' => $appointment,
            ],
            'message' => 'the appointment updated with success',
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     */

     #[OA\Delete(
        path: '/appointments/{appointment}',
        summary: 'Delete appointments for the authenticated user',
        security: [['sanctum' => []]],
        tags: ['appointments'],
        parameters: [
            new OA\Parameter(name: 'appointment', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'List of user appointment'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'appointment not found'),
        ]
     )]

    public function destroy(StoreAppointmentRequest $request, $id)
    {
        $appointment = $request->user()->appointments()->findOrFail($id);

        $appointment->delete();

        return response()->json([
            'success' => true,
            'message' => 'the appointment removed succefflly',
        ], 200);
    }
}
