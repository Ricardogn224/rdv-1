<?php

namespace App\Entity;

use App\Entity\Auth\User;
use App\Repository\EstablishmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\EstablishmentController;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    denormalizationContext: ['groups' => ['establishment:write']],
    normalizationContext: ['groups' => ['establishment:read']],
    operations: [
        new GetCollection(),
        new Post(
            denormalizationContext: ['groups' => ['establishment:write']],
            normalizationContext: ['groups' => ['establishment:read']],
            /*security: 'is_granted("EDIT", object)'*/
            controller: EstablishmentController::class,
            read: false
        ),
        new Get(normalizationContext: ['groups' => ['establishment:read', 'establishment:read:full']], /*security: 'is_granted("VIEW", object)',*/),
        new Patch(
            denormalizationContext: ['groups' => ['establishment:write:update']],
            normalizationContext: ['groups' => ['establishment:read']],
            /*security: 'is_granted("EDIT", object)'*/
            controller: EstablishmentController::class,
            read: false),
    ],
)]
#[ORM\Table(name: '`establishment`')]
#[ORM\Entity()]
class Establishment
{
    #[Groups(['provision:write', 'establishment:read',])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['provision:write', 'provision:read', 'provider:read', 'establishment:write', 'establishment:write:update', 'establishment:read', 'planningEmployee:read', 'planningDoctor:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[Groups(['establishment:write', 'establishment:write:update', 'establishment:read', 'planningEmployee:read', 'planningDoctor:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adress = null;

    #[ORM\OneToMany(mappedBy: 'Establishment', targetEntity: Provision::class)]
    private Collection $provisions;

    #[Groups(['establishment:read',  'establishment:write', 'establishment:write:update', 'establishment:read:full'])]
    #[ORM\ManyToOne(inversedBy: 'establishments')]
    private ?User $provider = null;

    #[Groups(['establishment:read', 'establishment:write', 'establishment:write:update', 'establishment:read:full'])]
    #[ORM\OneToMany(mappedBy: 'establishmentEmployee', targetEntity: User::class)]
    private Collection $employees;

    public function __construct()
    {
        $this->provisions = new ArrayCollection();
        $this->employees = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(?string $adress): static
    {
        $this->adress = $adress;

        return $this;
    }

    /**
     * @return Collection<int, Provision>
     */
    public function getProvisions(): Collection
    {
        return $this->provisions;
    }

    public function addProvision(Provision $provision): static
    {
        if (!$this->provisions->contains($provision)) {
            $this->provisions->add($provision);
            $provision->setEstablishment($this);
        }

        return $this;
    }

    public function removeProvision(Provision $provision): static
    {
        if ($this->provisions->removeElement($provision)) {
            // set the owning side to null (unless already changed)
            if ($provision->getEstablishment() === $this) {
                $provision->setEstablishment(null);
            }
        }

        return $this;
    }

    public function getProvider(): ?User
    {
        return $this->provider;
    }

    public function setProvider(?User $provider): static
    {
        $this->provider = $provider;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getEmployees(): Collection
    {
        return $this->employees;
    }

    public function addEmployee(User $employee): static
    {
        if (!$this->employees->contains($employee)) {
            $this->employees->add($employee);
            $employee->setEstablishmentEmployee($this);
        }

        return $this;
    }

    public function removeEmployee(User $employee): static
    {
        if ($this->employees->removeElement($employee)) {
            // set the owning side to null (unless already changed)
            if ($employee->getEstablishmentEmployee() === $this) {
                $employee->setEstablishmentEmployee(null);
            }
        }

        return $this;
    }

}
