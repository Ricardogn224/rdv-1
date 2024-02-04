<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model\Operation;
use App\Controller\ManagePlanningController;
use App\Dto\AddCongeDto;
use App\Dto\Mail\MailMultipleDto;
use App\Dto\Mail\MailMultipleResponseDto;
use App\Dto\PlanningMultipleResponseDto;
use App\Entity\Auth\User;
use App\State\AddCongeProcessor;
use App\State\Mail\MailMultipleProcessor;

/**
 * Mail model.
 */
#[ApiResource(
    shortName: 'Planning',
    description: 'planning conge',
    normalizationContext: ['groups' => ['planningDoctor:read']],
    operations: [
        new Post(
            uriTemplate: '/planning/conge',
            output: PlanningMultipleResponseDto::class,
            controller: ManagePlanningController::class . '::createCongePlanning',
        ),
    ],
)]
class Planning
{
    public int $employee_id;
    public string $type;
    public string $date;
}