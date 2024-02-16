<?php

namespace App\Doctrine;

use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\Appointment;
use App\Entity\Offer;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;

final readonly class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{

    public function __construct(
        private Security $security,
    )
    {
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {
        if ($this->security->isGranted('ROLE_ADMIN')) {
            // For ROLE_ADMIN, return all items, so no additional condition needed
            return;
        }
        
        if (Appointment::class !== $resourceClass || null === $user = $this->security->getUser()) {
            return;
        }

        if ($this->security->isGranted('ROLE_PROVIDER')) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder
            ->join(sprintf('%s.provisionEmployee', $rootAlias), 'pe')
            ->join('pe.provision', 'p')
            ->join('p.Establishment', 'e')
            ->andWhere('e.provider = :current_user')
            ->setParameter('current_user', $user);
            $queryBuilder->setParameter('current_user', $user->getId());
        } else {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf('%s.appointmentUser = :current_user', $rootAlias));
            $queryBuilder->setParameter('current_user', $user->getId());
        }

        
    }
}