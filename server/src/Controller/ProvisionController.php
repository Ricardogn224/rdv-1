<?php

namespace App\Controller;

use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Auth\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Establishment;
use App\Entity\Provision;
use App\Entity\ProvisionEmployee;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[AsController]
class ProvisionController extends AbstractController
{
    public function __invoke(Request $request, Provision $provision, EntityManagerInterface $entityManager, SerializerInterface $serializer): Provision
    {
        
        $data = json_decode($request->getContent(), true);
        print_r($data);

        // Update establishment fields from the request body
        if (isset($data['name'])) {
            $provision->setName($data['name']);
        }
        if (isset($data['establishment'])) {
            $establishment = $entityManager->getRepository(Establishment::class)->find($data['establishment']['id']);
            $provision->setEstablishment($establishment);
        }

        $entityManager->persist($provision);

        // Retrieve the employee entities based on their email addresses
        if (isset($data['employees']) && is_array($data['employees'])) {
            $employees = [];
            foreach ($data['employees'] as $employeeData) {
                $provisionEmployee = new ProvisionEmployee();
                if (isset($employeeData['email'])) {
                    $employee = $entityManager->getRepository(User::class)->findOneByEmail($employeeData['email']);
                    if ($employee) {
                        $provisionEmployee->setEmployee($employee);
                        $provisionEmployee->setProvision($provision);
                        $entityManager->persist($provisionEmployee);

                    } else {
                        return new JsonResponse(['error' => 'Employee not found'], JsonResponse::HTTP_NOT_FOUND);
                    }
                }
            }
            
        }

        $entityManager->flush();

        // Return a JSON response with the updated establishment
        return $provision;
    }
}