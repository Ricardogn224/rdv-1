<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model\Operation;
use App\Controller\ManagePlanningController;

use App\Dto\RdvResponseDto;


/**
 * Mail model.
 */
#[ApiResource(
    shortName: 'Rdv',
    description: 'Manage rdv',
    normalizationContext: ['groups' => ['planningRdv:read']],
    operations: [
        new Post(
            uriTemplate: '/planning/rdv',
            output: RdvResponseDto::class,
            controller: ManagePlanningController::class . '::createRdvPlanning',
        ),
    ],
)]
class ManageRdv
{
    public int $provision_employee_id;
    public string $patient_email;
    public string $hour;
    public string $date;
}