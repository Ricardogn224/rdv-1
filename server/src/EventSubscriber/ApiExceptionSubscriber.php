<?php 

// src/EventSubscriber/ApiExceptionSubscriber.php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Validator\Exception\ValidatorException;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class ApiExceptionSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [KernelEvents::EXCEPTION => 'onKernelException'];
    }

    public function onKernelException(ExceptionEvent $event)
    {
        $exception = $event->getThrowable();
        $data = ['message' => 'Une erreur est survenue'];

        if ($exception instanceof UniqueConstraintViolationException) {
            $data['message'] = 'Une erreur de contrainte unique est survenue.';
            $statusCode = JsonResponse::HTTP_CONFLICT;
        } elseif ($exception instanceof ValidatorException) {
            $data['message'] = 'Erreur de validation.';
            $statusCode = JsonResponse::HTTP_BAD_REQUEST;
        } elseif ($exception instanceof AccessDeniedException) {
            $data['message'] = 'Accès refusé.';
            $statusCode = JsonResponse::HTTP_FORBIDDEN;
        } else {
            $statusCode = JsonResponse::HTTP_INTERNAL_SERVER_ERROR;
        }

        $response = new JsonResponse($data, $statusCode);

        $event->setResponse($response);
    }
}
