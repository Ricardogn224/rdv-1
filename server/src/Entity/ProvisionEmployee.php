<?php

namespace App\Entity;

use App\Entity\Auth\User;
use App\Repository\ProvisionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    denormalizationContext: ['groups' => ['provisionEmployee:write']],
    normalizationContext: ['groups' => ['provisionEmployee:read']],
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Patch(denormalizationContext: ['groups' => ['provisionEmployee:write:update']]),
    ],
)]
#[ORM\Table(name: '`provision_employee`')]
#[ORM\Entity()]
class ProvisionEmployee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['provisionEmployee:write', 'provisionEmployee:read', 'appointment:read', 'planningRdv:read'])]
    #[ORM\ManyToOne(inversedBy: 'employeeProvisions', cascade: ['persist'])]
    private ?Provision $provision = null;

    #[ORM\OneToMany(mappedBy: 'provisionEmployee', targetEntity: Appointment::class)]
    private Collection $appointments;

    #[ORM\ManyToOne(inversedBy: 'provisionEmployees')]
    private ?User $employee = null;

    public function __construct()
    {
        $this->appointments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProvision(): ?Provision
    {
        return $this->provision;
    }

    public function setProvision(?Provision $provision): static
    {
        $this->provision = $provision;

        return $this;
    }

    /**
     * @return Collection<int, Appointment>
     */
    public function getAppointments(): Collection
    {
        return $this->appointments;
    }

    public function addAppointment(Appointment $appointment): static
    {
        if (!$this->appointments->contains($appointment)) {
            $this->appointments->add($appointment);
            $appointment->setProvisionEmployee($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getProvisionEmployee() === $this) {
                $appointment->setProvisionEmployee(null);
            }
        }

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
}
