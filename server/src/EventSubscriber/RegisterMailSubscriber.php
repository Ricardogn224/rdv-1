<?php
// api/src/EventSubscriber/BookMailSubscriber.php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Auth\User;
use App\Service\EmailService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class RegisterMailSubscriber implements EventSubscriberInterface
{

    private EmailService $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
        ];
    }

    public function sendMail(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();


        if (!$user instanceof User || Request::METHOD_POST !== $method) {
            return;
        }

        $destinator = $user->getEmail();
        $htlmContent = "Bonjour, " . $user->getFirstname(). " <br> <br>Félicitations pour avoir rejoint la plateforme 'Medecin sur Rendez-vous' ! C'est avec une grande joie que nous vous accueillons parmi nous. Votre inscription enrichit notre communauté et renforce notre engagement à fournir des services de qualité dans le domaine médical.";
        $subject = 'Inscription sur Medecin sur rdv';

        $this->emailService->sendVerificationEmail($destinator, $subject, $htlmContent);
    }
}