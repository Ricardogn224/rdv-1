<?php

namespace App\Security\Voter;

use App\Entity\Appointment;
use App\Entity\Establishment;
use App\Entity\Provision;
use App\Enum\RolesEnum;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class ProvisionVoter extends Voter
{
    public const EDIT = 'PROVISION_EDIT';
    public const VIEW = 'PROVISION_VIEW';
    public const VIEWALL = 'PROVISION_VIEWALL';

    public function __construct(private Security $security)
    {
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::EDIT, self::VIEW, self::VIEWALL])
            && $subject instanceof \App\Entity\Provision;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        assert($subject instanceof Provision);

        switch ($attribute) {
            case self::EDIT:
                // logic to determine if the user can EDIT
                // return true or false
                if ($subject->getEstablishment()->getProvider() === $user || $this->security->isGranted(RolesEnum::ADMIN)) {
                    return true;
                } else {
                    return false;
                }
                break;

            case self::VIEW:
                // logic to determine if the user can VIEW
                // return true or false
                if ( $this->security->isGranted(RolesEnum::ADMIN)) {
                    return true;
                } else {
                    return false;
                }
                break;

            case self::VIEWALL:
                // logic to determine if the user can VIEW
                // return true or false
                if ( $this->security->isGranted(RolesEnum::ADMIN)) {
                    return true;
                } else {
                    return false;
                }
                break;
        }

        return false;
    }
}
