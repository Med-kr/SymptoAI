<?php

namespace Database\Seeders;

use App\Models\medecin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Doctor;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $doctors = [
            [
                'name' => 'Dr. Ahmed Benali',
                'specialty' => 'Cardiologue',
                'city' => 'Casablanca',
                'years_of_experience' => 15,
                'consultation_price' => 300.00,
                'available_days' => json_encode(['Lundi', 'Mercredi', 'Vendredi']),
            ],
            [
                'name' => 'Dr. Sara Idrissi',
                'specialty' => 'Généraliste',
                'city' => 'Rabat',
                'years_of_experience' => 8,
                'consultation_price' => 150.00,
                'available_days' => json_encode(['Lundi', 'Mardi', 'Jeudi']),
            ],
            [
                'name' => 'Dr. Youssef Tazi',
                'specialty' => 'Dermatologue',
                'city' => 'Marrakech',
                'years_of_experience' => 12,
                'consultation_price' => 250.00,
                'available_days' => json_encode(['Mardi', 'Jeudi', 'Samedi']),
            ],
        ];

        foreach ($doctors as $doctor) {
            Doctor::create($doctor);
        }
    }
}
