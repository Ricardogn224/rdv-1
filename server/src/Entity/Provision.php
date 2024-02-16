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
use App\Controller\ProvisionController;
use App\Dto\ProvisionDto;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    normalizationContext: ['groups' => ['provision:read']],
    operations: [
        new GetCollection(),
        new Post(
            denormalizationContext: ['groups' => ['provision:write']],
            input: ProvisionDto::class,
            controller: ProvisionController::class,
            read: false,
            write:false
        ),
        new Get(),
    new Patch(denormalizationContext: ['groups' => ['provision:write:update']], /*security: 'is_granted("EDIT", object)',*/),
    ],
)]
#[ORM\Table(name: '`provision`')]
#[ORM\Entity()]
class Provision
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['provision:write', 'provision:read', 'provisionEmployee:read', 'establishment:read', 'provisionEmployee:write', 'provisionEmployee:read', 'appointment:read','planningRdv:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[Groups(['provision:write', 'provision:read', 'provisionEmployee:read'])]
    #[ORM\ManyToOne(inversedBy: 'provisions', cascade: ['persist'])]
    private ?Establishment $Establishment = null;

    #[Groups(['provision:write', 'provision:read'])]
    #[ORM\OneToMany(mappedBy: 'provision', targetEntity: ProvisionEmployee::class)]
    private Collection $employeeProvisions;

    public function __construct()
    {
        $this->employeeProvisions = new ArrayCollection();
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

    public function getEstablishment(): ?Establishment
    {
        return $this->Establishment;
    }

    public function setEstablishment(?Establishment $Establishment): static
    {
        $this->Establishment = $Establishment;

        return $this;
    }

    /**
     * @return Collection<int, ProvisionEmployee>
     */
    public function getEmployeeProvisions(): Collection
    {
        return $this->employeeProvisions;
    }

    public function addEmployeeProvision(ProvisionEmployee $employeeProvision): static
    {
        if (!$this->employeeProvisions->contains($employeeProvision)) {
            $this->employeeProvisions->add($employeeProvision);
            $employeeProvision->setProvision($this);
        }

        return $this;
    }

    public function removeEmployeeProvision(ProvisionEmployee $employeeProvision): static
    {
        if ($this->employeeProvisions->removeElement($employeeProvision)) {
            // set the owning side to null (unless already changed)
            if ($employeeProvision->getProvision() === $this) {
                $employeeProvision->setProvision(null);
            }
        }

        return $this;
    }

}
