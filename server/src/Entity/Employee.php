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
    denormalizationContext: ['groups' => ['employee:write']],
    normalizationContext: ['groups' => ['employee:read']],
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Patch(denormalizationContext: ['groups' => ['employee:write:update']]),
    ],
)]
#[ORM\Table(name: '`employee`')]
#[ORM\Entity()]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['employee:read'])]
    #[ORM\ManyToOne(inversedBy: 'employees')]
    private ?Establishment $establishment = null;

    #[Groups(['employee:read'])]
    #[ORM\OneToOne(inversedBy: 'employee', cascade: ['persist', 'remove'])]
    private ?User $user_employee = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }

    public function getUserEmployee(): ?User
    {
        return $this->user_employee;
    }

    public function setUserEmployee(?User $user_employee): static
    {
        $this->user_employee = $user_employee;

        return $this;
    }

}
