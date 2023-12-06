<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Auth\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    denormalizationContext: ['groups' => ['appointment:write']],
    normalizationContext: ['groups' => ['appointment:read']],
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Patch(denormalizationContext: ['groups' => ['appointment:write:update']]),
    ],
)]
#[ORM\Table(name: '`appointment`')]
#[ORM\Entity()]
class Appointment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['appointment:write', 'appointment:read'])]
    #[ORM\ManyToOne(inversedBy: 'appointments', cascade: ['persist'])]
    private ?ProvisionEmployee $provisionEmployee = null;

    #[Groups(['appointment:read', 'appointment:write'])]
    #[ORM\ManyToOne(inversedBy: 'appointments', cascade: ['persist'])]
    private ?User $appointmentUser = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProvisionEmployee(): ?ProvisionEmployee
    {
        return $this->provisionEmployee;
    }

    public function setProvisionEmployee(?ProvisionEmployee $provisionEmployee): static
    {
        $this->provisionEmployee = $provisionEmployee;

        return $this;
    }

    public function getAppointmentUser(): ?User
    {
        return $this->appointmentUser;
    }

    public function setAppointmentUser(?User $appointmentUser): static
    {
        $this->appointmentUser = $appointmentUser;

        return $this;
    }
}
