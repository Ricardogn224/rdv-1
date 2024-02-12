<?php 

namespace App\Controller;

use App\Entity\Auth\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class GetUserByRoleController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $role = $request->query->get('role');

        if (!$role) {
            return new JsonResponse(['error' => 'Role parameter is required'], Response::HTTP_BAD_REQUEST);
        }

        // Your logic to fetch users by role
        $allUsers = $entityManager->getRepository(User::class)->findAll();

        $usersArray = [];

        foreach ($allUsers as $user) {
            if (in_array($role, $user->getRoles())) {
                $usersArray[] = $user;
            }
        }

        // Serialize users and return JSON response
        $data = $this->serializeUsers($usersArray);

        return new JsonResponse($data, Response::HTTP_OK);
    }

    private function serializeUsers(array $users): array
    {
        // Serialize users as needed (e.g., using Symfony's Serializer component or manually)
        // Example: Convert entities to arrays
        $serializedUsers = [];
        foreach ($users as $user) {
            $serializedUsers[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastname(),
                'establishment' => [
                    'id' => $user->getEstablishmentEmployee() ? $user->getEstablishmentEmployee()->getId() : null,
                    'name' => $user->getEstablishmentEmployee() ? $user->getEstablishmentEmployee()->getName() : null,
                    // Add more fields as needed
                ]
                // Add more fields as needed
            ];
        }

        return $serializedUsers;
    }
}
