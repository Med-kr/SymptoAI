<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;
class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    #[OA\Get(
        path: '/doctors',
        summary: 'Get all doctors',
        security: [['sanctum' => []]],
        tags: ['doctors'],
        responses: [
            new OA\Response(response: 200, description: 'List of doctors'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'doctors not found'),
        ]
    )]

    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'doctors' => Doctor::all(),
        ],
            'message' => 'doctore are listed successfully',
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

     #[OA\Get(
        path: '/doctors/{id}',
        summary: 'Get all doctors',
        security: [['sanctum' => []]],
        tags: ['doctors'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'fetch doctor'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'doctors not found'),
        ]
     )]

    public function show(Doctor $doctor)
    {
        return response()->json([
            'sucess' => true,
            'date' => [
                'Doctor' => $doctor,
            ],
            'message' => 'le medcin a recupere avec sucee',
        ], 200);
    }

    #[OA\Get(
        path: '/doctors/search',
        summary: 'search for doctors',
        security: [['sanctum' => []]],
        tags: ['doctors'],
        parameters: [
                    new OA\Parameter(name: 'specialty', in: 'query', required: false, schema: new OA\Schema(type: 'string', example: "General Medicine")),
                    new OA\Parameter(name: 'city', in: 'query', required: false, schema: new OA\Schema(type: 'string', example: "rabat")),
                ],
        responses: [
            new OA\Response(response: 200, description: 'List of doctors'),
            new OA\Response(response: 401, description: 'Unauthenticated'),
            new OA\Response(response: 404, description: 'doctors not found'),
        ]
    )]

    public function search(Request $request)
    {
        $query = Doctor::query();

        if ($request->filled('specialty')) {
            $query->where('specialty', 'like', '%' . $request->specialty . '%');
        }

        if ($request->filled('city')) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }

        $doctors = $query->get();

        return response()->json([
            'success' => true,
            'data' => $doctors,
            'count' => $doctors->count(),
            'message' => $doctors->isEmpty()
                ? 'Aucun résultat trouvé'
                : 'Résultats de la recherche',
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Doctor $doctor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Doctor $doctor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $doctor)
    {
        //
    }
}
