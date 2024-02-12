<?php

namespace App\Controller;

use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Auth\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Establishment;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[AsController]
class EstablishmentController extends AbstractController
{
    public function __invoke(Request $request, Establishment $establishment, EntityManagerInterface $entityManager, SerializerInterface $serializer): Establishment
    {
        $data = json_decode($request->getContent(), true);

        // Update establishment fields from the request body
        if (isset($data['name'])) {
            $establishment->setName($data['name']);
        }
        if (isset($data['adress'])) {
            $establishment->setAdress($data['adress']);
        }

        // Retrieve the provider entity based on the email address
        if (isset($data['provider']['email'])) {
            $provider = $entityManager->getRepository(User::class)->findOneByEmail($data['provider']['email']);
            if ($provider) {
                $establishment->setProvider($provider);
            } else {
                return new JsonResponse(['error' => 'Provider not found'], JsonResponse::HTTP_NOT_FOUND);
            }
        }

        $currentEmployees = $establishment->getEmployees();

        if ($currentEmployees) {
            foreach ($currentEmployees as $employee) {
                $establishment->removeEmployee($employee);
            }
        }

        // Retrieve the employee entities based on their email addresses
        if (isset($data['employees']) && is_array($data['employees'])) {
            $employees = [];
            foreach ($data['employees'] as $employeeData) {
                if (isset($employeeData['email'])) {
                    $employee = $entityManager->getRepository(User::class)->findOneByEmail($employeeData['email']);
                    if ($employee) {
                        $establishment->addEmployee($employee);
                    } else {
                        return new JsonResponse(['error' => 'Employee not found'], JsonResponse::HTTP_NOT_FOUND);
                    }
                }
            }
            
        }

        $entityManager->persist($establishment);

        $entityManager->flush();

        // Return a JSON response with the updated establishment
        return $establishment;
    }
}