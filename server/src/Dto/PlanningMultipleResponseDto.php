<?php

namespace App\Dto;

use App\Entity\Auth\User;
use App\Entity\Establishment;
use App\Entity\PlanningDoctor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;

final class PlanningMultipleResponseDto
{

    #[Groups(['planningDoctor:read'])]
    protected string $firstname;

    #[Groups(['planningDoctor:read'])]
    protected string $lastname;

    #[Groups(['planningDoctor:read'])]
    protected ?Establishment $establishmentEmployee = null;

    #[Groups(['planningDoctor:read'])]
    private Collection $planningDoctors;

    public function __construct(User $user)
    {
        $this->planningDoctors = new ArrayCollection();

        $this->firstname = $user->getFirstname();
        $this->lastname = $user->getLastname();
        $this->establishmentEmployee = $user->getEstablishmentEmployee();
        $this->planningDoctors = $user->getPlanningDoctors();
    }

    /**
     * Return the firstname.
     *
     * @return string
     */
    public function getFirstname(): string
    {
        return $this->firstname;
    }

    /**
     * Return the lastname.
     *
     * @return string
     */
    public function getLastname(): string
    {
        return $this->lastname;
    }

    /**
     * Return the establishment.
     *
     * @return ?Establishment
     */
    public function getEstablishmentEmployee(): Establishment
    {
        return $this->establishmentEmployee;
    }

    /**
     * @return Collection<int, PlanningDoctor>
     */
    public function getPlanningDoctors(): Collection
    {
        return $this->planningDoctors;
    }

}