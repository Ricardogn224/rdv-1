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
        $htlmContent = "Bienvenue " . $user->getFirstname()  . ' <a href="#">Confirm my Email</a>';
        $subject = 'Please Confirm your Email';

        $this->emailService->sendVerificationEmail($destinator, $subject, $htlmContent);

        // $message = (new Email())
        //     ->from('system@example.com')
        //     ->to('contact@les-tilleuls.coop')
        //     ->subject('A new book has been added')
        //     ->text(sprintf('The book #%d has been added.', $book->getId()));

        // $this->mailer->send($message);
    }
}