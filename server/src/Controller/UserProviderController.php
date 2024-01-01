<?php

namespace App\Controller;

use App\Entity\Auth\User;
use App\Entity\Provider;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserProviderController extends AbstractController
{
    public function createUserWithProvider(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {

        // Get the JSON data from the request body
        $jsonData = $request->getContent();

        // Deserialize the JSON data into the User entity
        $user = $serializer->deserialize($jsonData, User::class, 'json');

        // Extract kbis from JSON data
        $data = json_decode($jsonData, true);
        $kbis = $data['kbis'] ?? null;

        // Create a Provider
        $provider = new Provider();
        // Set properties of the Provider
        $provider->setKbis($kbis);
        $provider->setActive(true); // Set other properties if needed

        // Set the User in the Provider
        $provider->setUserProvider($user);

        // Set the Provider in the User
        $user->setProvider($provider);

        // Persist entities and flush the EntityManager
        $entityManager->persist($user);
        $entityManager->persist($provider);
        $entityManager->flush();

        $responseData = [
            'message' => 'User and Provider created successfully',
            'user' => $user,
            'provider' => $provider,
        ];

        // Serialize the response data to JSON
        $jsonResponseData = $serializer->serialize($responseData, 'json');

        return new JsonResponse($jsonResponseData, Response::HTTP_CREATED, [], true);
    }
}