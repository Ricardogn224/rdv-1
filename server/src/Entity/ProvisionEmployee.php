<?php

namespace App\Entity;

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

    #[Groups(['provisionEmployee:write', 'provisionEmployee:read'])]
    #[ORM\ManyToOne(inversedBy: 'provisionEmployees', cascade: ['persist'])]
    private ?Employee $employee = null;

    #[Groups(['provisionEmployee:write', 'provisionEmployee:read'])]
    #[ORM\ManyToOne(inversedBy: 'employeeProvisions', cascade: ['persist'])]
    private ?Provision $provision = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmployee(): ?Employee
    {
        return $this->employee;
    }

    public function setEmployee(?Employee $employee): static
    {
        $this->employee = $employee;

        return $this;
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
}
