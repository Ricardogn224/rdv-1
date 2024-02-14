<?php

namespace App\Controller;

use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Auth\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Establishment;
use App\Enum\RolesEnum;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[AsController]
class ManageRoleController extends AbstractController
{
    public function __construct(
        protected Security $security,
    ) {}

    public function __invoke(Request $request, User $user, EntityManagerInterface $entityManager, SerializerInterface $serializer): User
    {
        $data = json_decode($request->getContent(), true);

        $accountType = $data['accountType'];

        $userLogged = $this->security->getUser();

        if (null === $userLogged) {
            if ($accountType === "admin" ) {
                throw new BadRequestHttpException('Bad request');
            }
        }

        if ($userLogged instanceof UserInterface) {
            if ($userLogged->getRoles() !== ['ROLE_ADMIN']) {
                if ($accountType === "admin" ) {
                    throw new BadRequestHttpException('Bad request');
                }
            }
        }
        return $user;
    }
}