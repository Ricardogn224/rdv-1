<?php

namespace App\Entity;

use App\Entity\Auth\User;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    denormalizationContext: ['groups' => ['planningDoctor:write']],
    normalizationContext: ['groups' => ['planningDoctor:read']],
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Patch(denormalizationContext: ['groups' => ['planningDoctor:write:update']]),
    ],
)]
#[ORM\Table(name: '`planning_doctor`')]
#[ORM\Entity()]
class PlanningDoctor
{

    #[Groups(['appointment:read', 'planningDoctor:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['planningDoctor:write', 'planningEmployee:read', 'planning:read', 'planningDoctor:read', 'appointment:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $date = null;

    #[Groups(['planningDoctor:write', 'planningEmployee:read', 'planning:read', 'planningDoctor:read', 'appointment:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $hour = null;

    #[Groups(['planningDoctor:write'])]
    #[ORM\ManyToOne(inversedBy: 'planningDoctors')]
    private ?User $employee = null;

    #[Groups(['planningDoctor:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $type = null;

    #[ORM\OneToOne(inversedBy: 'planningDoctor', cascade: ['persist', 'remove'])]
    private ?Appointment $appointment = null;

    #[Groups(['planningDoctor:write:update', 'appointment:read', 'planningDoctor:read'])]
    #[ORM\Column(nullable: true)]
    private ?bool $isCancelled = null;

    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(?string $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getHour(): ?string
    {
        return $this->hour;
    }

    public function setHour(?string $hour): static
    {
        $this->hour = $hour;

        return $this;
    }

    public function getEmployee(): ?User
    {
        return $this->employee;
    }

    public function setEmployee(?User $employee): static
    {
        $this->employee = $employee;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getAppointment(): ?Appointment
    {
        return $this->appointment;
    }

    public function setAppointment(?Appointment $appointment): static
    {
        $this->appointment = $appointment;

        return $this;
    }

    public function isIsCancelled(): ?bool
    {
        return $this->isCancelled;
    }

    public function setIsCancelled(?bool $isCancelled): static
    {
        $this->isCancelled = $isCancelled;

        return $this;
    }
}
