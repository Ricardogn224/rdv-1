<?php

namespace App\Controller;

use App\Dto\PlanningMultipleResponseDto;
use App\Dto\RdvResponseDto;
use App\Entity\Appointment;
use App\Entity\Auth\User;
use App\Entity\ManageRdv;
use App\Entity\Planning;
use App\Entity\PlanningDoctor;
use App\Entity\Provider;
use App\Entity\ProvisionEmployee;
use App\Service\EmailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class ManagePlanningController extends AbstractController
{

    public function __construct()
    {
    }

    public function createCongePlanning(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): PlanningMultipleResponseDto
    {

        // Get the JSON data from the request body
        $jsonData = $request->getContent();

        // Extract kbis from JSON data
        $data = json_decode($jsonData, true);

        $type = $data['type'];

        $employeeId = $data['employee_id'];

        $user = $entityManager->getRepository(User::class)->find($employeeId);

        // Define your array of hours
        $morningHours = ["08:30", "09:30", "10:30", "11:30"];

        $afternoonHours = ["13:30", "14:30", "15:30", "16:30", "17:30"];

        // Perform actions specific to 'morning'
        $day = $data['date'];

        if ($type === 'morning') {
            // Insert records into PlanningDoctor for each hour
            foreach ($morningHours as $hour) {
                $planningDoctor = new PlanningDoctor();
                $planningDoctor->setEmployee($user); // Assuming $data->employee is the User object
                $planningDoctor->setDate($day);
                $planningDoctor->setHour($hour);
                $planningDoctor->setType('conge');

                $entityManager->persist($planningDoctor);
            }
        }

        if ($type === 'afternoon') {

            // Insert records into PlanningDoctor for each hour
            foreach ($afternoonHours as $hour) {
                $planningDoctor = new PlanningDoctor();
                $planningDoctor->setEmployee($user); // Assuming $data->employee is the User object
                $planningDoctor->setDate($day);
                $planningDoctor->setHour($hour);
                $planningDoctor->setType('conge');

                $entityManager->persist($planningDoctor);
            }
        }

        if ($type === 'fullDay') {

            foreach ($morningHours as $hour) {
                $planningDoctor = new PlanningDoctor();
                $planningDoctor->setEmployee($user); // Assuming $data->employee is the User object
                $planningDoctor->setDate($day);
                $planningDoctor->setHour($hour);
                $planningDoctor->setType('conge');

                $entityManager->persist($planningDoctor);
            }
            // Insert records into PlanningDoctor for each hour
            foreach ($afternoonHours as $hour) {
                $planningDoctor = new PlanningDoctor();
                $planningDoctor->setEmployee($user); // Assuming $data->employee is the User object
                $planningDoctor->setDate($day);
                $planningDoctor->setHour($hour);
                $planningDoctor->setType('conge');

                $entityManager->persist($planningDoctor);
            }
        }

        $entityManager->flush();

        $result = new PlanningMultipleResponseDto($user);

        return $result;
        
    }

    public function createRdvPlanning(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): RdvResponseDto
    {

        // Get the JSON data from the request body
        $jsonData = $request->getContent();


        $data = json_decode($jsonData, true);

        $provisionEmployeeId = $data['provision_employee_id'];

        $motif = $data['motif'];

        $provisionEmployee = $entityManager->getRepository(ProvisionEmployee::class)->find($provisionEmployeeId);

        $day = $data['date'];

        $hour = $data['hour'];

        $patientMail = $data['patient_email'];

        $patient = $entityManager->getRepository(User::class)->findOneByEmail($patientMail);

        $appointment = new Appointment();
        $appointment->setProvisionEmployee($provisionEmployee);
        $appointment->setAppointmentUser($patient);

        $appointment->setMotif($motif);
            // Insert records into PlanningDoctor for each hour
        $planningDoctor = new PlanningDoctor();
        $planningDoctor->setEmployee($provisionEmployee->getEmployee()); // Assuming $data->employee is the User object
        $planningDoctor->setDate($day);
        $planningDoctor->setHour($hour);
        $planningDoctor->setType('rdv');
        $planningDoctor->setAppointment($appointment);

        $entityManager->persist($planningDoctor);
        $entityManager->persist($appointment);

        $entityManager->flush();

        $result = new RdvResponseDto($appointment);

        return $result;
        
    }

}