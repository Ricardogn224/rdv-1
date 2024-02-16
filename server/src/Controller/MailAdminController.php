<?php

namespace App\Controller;

use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Auth\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Establishment;
use App\Service\EmailService;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[AsController]
class MailAdminController extends AbstractController
{
    private EmailService $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    public function __invoke(Request $request, User $user, EntityManagerInterface $entityManager, SerializerInterface $serializer): User
    {

        $destinator = 'jkanikainathan@myges.fr';
        $htlmContent = "Bonjour, " . $user->getFirstname() . " " . $user->getLastname() . " vient de s'incrire en tant que prestataire, veuillez validez ou non son compte";
        $subject = 'Inscription prestataire sur Medecin sur rdv';

        $this->emailService->sendVerificationEmail($destinator, $subject, $htlmContent);

        return $user;
    }

        
}