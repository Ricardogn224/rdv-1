<?php

declare(strict_types=1);

namespace App\ContextBuilder;

use ApiPlatform\Serializer\SerializerContextBuilderInterface;
use App\Entity\Auth\User;
use App\Enum\Groups\UserGroupsEnum;
use App\Enum\RolesEnum;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;
use Symfony\Component\DependencyInjection\Attribute\AutowireDecorated;
use Symfony\Component\HttpFoundation\Request;

#[AsDecorator(decorates: 'api_platform.serializer.context_builder', priority: 1000)]
class UserContextBuilder implements SerializerContextBuilderInterface
{
    public function __construct(
        #[AutowireDecorated] protected SerializerContextBuilderInterface $decorated,
        protected Security $security,
    ) {}

    public function createFromRequest(Request $request, bool $normalization, array $extractedAttributes = null): array
    {
        $context = $this->decorated->createFromRequest($request, $normalization, $extractedAttributes);
        $resourceClass = $context['resource_class'] ?? null;

        // If no groups is defined or if we are in denormalization mode (json -> to object)
        if (!isset($context['groups']) || false === $normalization) {
            return $context;
        }

        if ($resourceClass !== User::class) {
            return $context;
        }

        $user = $this->security->getUser();

        if (null === $user) {
            return $context;
        }

        if ($user->getRoles() === ['ROLE_PROVIDER']) {
            $context['groups'][] = 'user:provider:read';
        }

        if ($user->getRoles() === ['ROLE_ADMIN']) {
            $context['groups'][] = 'user:admin:write';
            $context['groups'][] = 'user:admin:read';
        }

        return $context;
    }
}