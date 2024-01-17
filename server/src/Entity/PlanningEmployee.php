<?php

namespace App\Entity;

use App\Entity\Auth\User;
use App\Repository\PlanningEmployeeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlanningEmployeeRepository::class)]
class PlanningEmployee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateDay = null;

    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateHour = null;

    #[ORM\ManyToOne(inversedBy: 'planningEmployees')]
    private ?User $employee = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $type = null;

    #[ORM\OneToOne(inversedBy: 'planningEmployee', cascade: ['persist', 'remove'])]
    private ?Appointment $appointment = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDay(): ?\DateTimeInterface
    {
        return $this->dateDay;
    }

    public function setDateDay(?\DateTimeInterface $dateDay): static
    {
        $this->dateDay = $dateDay;

        return $this;
    }

    public function getDateHour(): ?\DateTimeInterface
    {
        return $this->dateHour;
    }

    public function setDateHour(?\DateTimeInterface $dateHour): static
    {
        $this->dateHour = $dateHour;

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

    public function setType(string $type): static
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
}
