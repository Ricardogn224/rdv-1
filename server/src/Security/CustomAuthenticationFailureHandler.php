<?php 

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;

class CustomAuthenticationFailureHandler implements AuthenticationFailureHandlerInterface
{
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response
    {
        // Vous pouvez utiliser $exception->getMessageKey() et $exception->getMessageData()
        // pour obtenir le message d'erreur par défaut et le personnaliser

        $data = [
            // Vous pouvez personnaliser le message d'erreur ici
            'message' => 'Vos identifiants de connexion ne sont pas valides. Veuillez réessayer.'
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }
}
