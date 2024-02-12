<?php

declare(strict_types=1);

namespace App\Enum;

enum UserAccountTypeEnum: string
{
    case ADMIN = 'admin';
    case PROVIDER = 'provider';
    case NORMAL = 'normal';
    case EMPLOYEE = 'employee';
}
