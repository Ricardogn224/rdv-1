<?php

declare(strict_types=1);

namespace App\Normalizer\UserLink;

use App\Entity\Employee;
use App\Entity\Establishment;
use App\Entity\Provider;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class ProviderEstablishmentDenormalizer implements DenormalizerInterface
{
    public function __construct(
        protected Security $security,
        protected PasswordHasherFactoryInterface $hasher,
        protected ObjectNormalizer $normalizer,
    ) {}

    public function denormalize(mixed $data, string $type, string $format = null, array $context = []): mixed
    {
        $establishment = $this->normalizer->denormalize($data, $type, $format, $context);

        assert($establishment instanceof Establishment);

        $establishment->setProvider($this->security->getUser()->getProvider());

        return $establishment;
    }

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type === Establishment::class;
    }
}