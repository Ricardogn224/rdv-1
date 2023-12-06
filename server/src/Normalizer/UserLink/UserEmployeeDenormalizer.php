<?php

declare(strict_types=1);

namespace App\Normalizer\UserLink;

use App\Entity\Employee;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class UserEmployeeDenormalizer implements DenormalizerInterface
{
    public function __construct(
        protected Security $security,
        protected PasswordHasherFactoryInterface $hasher,
        protected ObjectNormalizer $normalizer,
    ) {}

    public function denormalize(mixed $data, string $type, string $format = null, array $context = []): mixed
    {
        $employee = $this->normalizer->denormalize($data, $type, $format, $context);

        assert($employee instanceof Employee);

        $employee->setUserEmployee($this->security->getUser());

        return $employee;
    }

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type === Employee::class;
    }
}
