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
    denormalizationContext: ['groups' => ['provision:write']],
    normalizationContext: ['groups' => ['provision:read']],
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Patch(denormalizationContext: ['groups' => ['provision:write:update']]),
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

    #[Groups(['establishment:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[Groups(['provision:read'])]
    #[ORM\ManyToMany(targetEntity: Establishment::class, inversedBy: 'provisions')]
    private Collection $establishments;

    public function __construct()
    {
        $this->establishments = new ArrayCollection();
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

    /**
     * @return Collection<int, Establishment>
     */
    public function getEstablishments(): Collection
    {
        return $this->establishments;
    }

    public function addEstablishment(Establishment $establishment): static
    {
        if (!$this->establishments->contains($establishment)) {
            $this->establishments->add($establishment);
        }

        return $this;
    }

    public function removeEstablishment(Establishment $establishment): static
    {
        $this->establishments->removeElement($establishment);

        return $this;
    }
}
