<?php

namespace App\Controller;

use ApiPlatform\Symfony\Security\Exception\AccessDeniedException;
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
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[AsController]
class GetUserLogin extends AbstractController
{ 
    public function __invoke(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): User
    {
        $email =  $request->query->get('email');

        
        $email = trim($email);

        if (!$email) {
            throw new BadRequestHttpException('Le champ email est requis');
        }

        $user = $entityManager->getRepository(User::class)->findOneByEmail($email);

        if (!$user) {
            throw new NotFoundHttpException('Compte non existant');
        }

        return $user;
    }
}