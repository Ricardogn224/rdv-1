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
use App\ValueObject\RequestUserProviderLink;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    denormalizationContext: ['groups' => ['provider:write']],
    normalizationContext: ['groups' => ['provider:read']],
    operations: [
        new GetCollection(security: 'is_granted("VIEWALL", object)',),
        new Post(),
        new Get(security: 'is_granted("VIEW", object)',),
        new Patch(denormalizationContext: ['groups' => ['provider:write:update']], security: 'is_granted("EDIT", object)',),
    ],
)]
#[ORM\Table(name: '`provider`')]
#[ORM\Entity()]
class Provider
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['provider:read', 'provider:write', 'establishment:read'])]
    #[Assert\Length(min: 2)]
    #[ORM\Column(length: 255)]
    private ?string $kbis = null;

    #[Groups(['provider:read'])]
    #[ORM\Column(nullable: true)]
    private ?bool $active = false;

    #[Groups(['provider:read'])]
    #[ORM\OneToMany(mappedBy: 'provider', targetEntity: Establishment::class)]
    private Collection $establishments;

    #[Groups(['provider:read', 'establishment:read'])]
    #[ORM\OneToOne(inversedBy: 'provider', cascade: ['persist', 'remove'])]
    private ?User $user_provider = null;

    public function __construct()
    {
        $this->establishments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getKbis(): ?string
    {
        return $this->kbis;
    }

    public function setKbis(string $kbis): static
    {
        $this->kbis = $kbis;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(?bool $active): static
    {
        $this->active = $active;

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
            $establishment->setProvider($this);
        }

        return $this;
    }

    public function removeEstablishment(Establishment $establishment): static
    {
        if ($this->establishments->removeElement($establishment)) {
            // set the owning side to null (unless already changed)
            if ($establishment->getProvider() === $this) {
                $establishment->setProvider(null);
            }
        }

        return $this;
    }

    public function getUserProvider(): ?User
    {
        return $this->user_provider;
    }

    public function setUserProvider(?User $user_provider): static
    {
        $this->user_provider = $user_provider;

        return $this;
    }
}
