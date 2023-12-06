<?php

namespace App\Controller;

use App\Entity\Provider;
use App\Entity\Auth\User;
use App\ValueObject\ProviderCreationRequest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class CreateProviderWithUserController
{
    public function __invoke(ProviderCreationRequest $data, EntityManagerInterface $em): Provider
    {
        $user = $em->getRepository(User::class)->find($data->userId);
        if (!$user) {
            throw new NotFoundHttpException('User not found');
        }

        $provider = new Provider();
        $provider->setKbis($data->kbis)
                 ->setUserProvider($user);

        $em->persist($provider);
        $em->flush();

        return $provider;
    }
}