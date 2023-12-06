<?php

namespace App\Entity;

use App\Repository\EstablishmentRepository;
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
    denormalizationContext: ['groups' => ['establishment:write']],
    normalizationContext: ['groups' => ['establishment:read']],
    operations: [
        new GetCollection(),
        new Post(),
        new Get(security: 'is_granted("VIEW", object)',),
        new Patch(denormalizationContext: ['groups' => ['establishment:write:update']], security: 'is_granted("EDIT", object)',),
    ],
)]
#[ORM\Table(name: '`establishment`')]
#[ORM\Entity()]
class Establishment
{
    #[Groups(['provision:write'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['employee:write', 'provision:write', 'provision:read', 'provider:read', 'employee:read', 'establishment:write', 'establishment:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[Groups(['establishment:write', 'establishment:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adress = null;

    #[Groups(['establishment:read'])]
    #[ORM\ManyToOne(inversedBy: 'establishments')]
    private ?Provider $provider = null;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Employee::class)]
    private Collection $employees;

    #[ORM\OneToMany(mappedBy: 'Establishment', targetEntity: Provision::class)]
    private Collection $provisions;

    public function __construct()
    {
        $this->employees = new ArrayCollection();
        $this->provisions = new ArrayCollection();
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

    public function getProvider(): ?Provider
    {
        return $this->provider;
    }

    public function setProvider(?Provider $provider): static
    {
        $this->provider = $provider;

        return $this;
    }

    /**
     * @return Collection<int, Employee>
     */
    public function getEmployees(): Collection
    {
        return $this->employees;
    }

    public function addEmployee(Employee $employee): static
    {
        if (!$this->employees->contains($employee)) {
            $this->employees->add($employee);
            $employee->setEstablishment($this);
        }

        return $this;
    }

    public function removeEmployee(Employee $employee): static
    {
        if ($this->employees->removeElement($employee)) {
            // set the owning side to null (unless already changed)
            if ($employee->getEstablishment() === $this) {
                $employee->setEstablishment(null);
            }
        }

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

}
