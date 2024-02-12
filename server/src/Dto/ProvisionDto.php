<?php

namespace App\Dto;

use App\Entity\Auth\User;
use App\Entity\Establishment;
use App\Entity\PlanningDoctor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use PhpParser\Node\Expr\Cast\Array_;
use Symfony\Component\Serializer\Annotation\Groups;

class ProvisionDto
{
    #[Groups(['provision:write'])]
    public string $name;

    #[Groups(['provision:write'])]
    public Establishment $establishment;

    #[Groups(['provision:write'])]
    public array $employees;

    public function __construct()
    {
        $this->employees = [];
    }
}