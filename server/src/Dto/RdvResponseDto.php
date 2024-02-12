<?php

namespace App\Dto;

use App\Entity\Appointment;
use App\Entity\Auth\User;
use App\Entity\PlanningDoctor as PlanningDoctorEntity;
use App\Entity\ProvisionEmployee;
use App\Model\Planning;
use Symfony\Component\Serializer\Annotation\Groups;

final class RdvResponseDto
{

    #[Groups(['planningRdv:read'])]
    protected User $appointmentUser;

    #[Groups(['planningRdv:read'])]
    protected ProvisionEmployee $provisionEmployee;

    public function __construct(Appointment $appointment)
    {

        $this->provisionEmployee = $appointment->getProvisionEmployee();
        $this->appointmentUser = $appointment->getAppointmentUser();
    }

    /**
     * Add a rdv.
     *
     * @param ProvisionEmployee $provisionEmployee
     */
    public function getProvisionEmployee(): ProvisionEmployee
    {
        return $this->provisionEmployee; 
    }

    /**
     * Add a rdv.
     *
     * @param User $appointmentUser
     */
    public function getAppointmentUser(): User
    {
        return $this->appointmentUser; 
    }


}