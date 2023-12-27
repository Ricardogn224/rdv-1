<?php

namespace App\ValueObject;

use ApiPlatform\Metadata\ApiResource;


class ProviderCreationRequest 
{
    public string $kbis;
    public int $userId; // ID of the user to link to
}