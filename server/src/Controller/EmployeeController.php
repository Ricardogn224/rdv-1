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
class EmployeeController extends AbstractController
{
    public function __invoke(Request $request, User $employee, EntityManagerInterface $entityManager, SerializerInterface $serializer): User
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['email'])) {
            $employee->setEmail($data['email']);
        }

        if (isset($data['firstname'])) {
            $employee->setFirstname($data['firstname']);
        }
        if (isset($data['lastname'])) {
            $employee->setLastname($data['lastname']);
        }

        if (isset($data['dateOfBirth'])) {
            // Convert the string date of birth to a DateTime object
            $dateOfBirth = new \DateTime($data['dateOfBirth']);
            // Set the date of birth using the DateTime object
            $employee->setDateOfBirth($dateOfBirth);
        }

        if (isset($data['establishmentEmployee'])) {
            $establishment = $entityManager->getRepository(Establishment::class)->find($data['establishmentEmployee']['id']);
            $employee->setEstablishmentEmployee($establishment);
        }

        $entityManager->persist($establishment);

        $entityManager->flush();

        return $employee;
    }
}