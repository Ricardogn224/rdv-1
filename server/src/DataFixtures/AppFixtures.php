<?php

namespace App\DataFixtures;

use App\Entity\Auth\User;
use App\Entity\Provision;
use App\Entity\ProvisionEmployee;
use App\Entity\Establishment;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {

        // Prestations
        $prestations = [
            'Consultation générale',
            'Vaccination',
            'Bilan sanguin complet',
            'Radiographie',
            'Échographie',
            'Consultation spécialisée en cardiologie',
            'Consultation spécialisée en dermatologie',
            'Séance de kinésithérapie',
            'Test d\'audition',
            'Test de vue',
        ];

        $provisions = [];
        foreach ($prestations as $nomPrestation) {
            $provision = new Provision();
            $provision->setName($nomPrestation);
            $manager->persist($provision);
            $provisions[] = $provision;
        }

        $providers = [];
        $employees = [];
        // Création de 5 utilisateurs de chaque type
        for ($i = 0; $i < 5; $i++) {
            // Utilisateur
            $userTest = new User();
            $userTest->setEmail("user$i@example.com");
            $userTest->setFirstname("User$i");
            $userTest->setLastname("Test$i");
            $userTest->setDateOfBirth(new \DateTime('1997-10-16'));
            $userTest->setCreatedAt(new \DateTimeImmutable());
            $userTest->setUpdatedAt(new \DateTimeImmutable());
            $userTest->setKbis(strval(123456789 + $i));
            $userTest->setActive(true);
            $userTest->setRoles(['ROLE_USER']);
            $userTest->setPassword($this->passwordHasher->hashPassword($userTest, "userpass$i"));
            $manager->persist($userTest);

            // Administrateur
            $admin = new User();
            $admin->setEmail("admin$i@example.com");
            $admin->setRoles(['ROLE_ADMIN']);
            $admin->setActive(true);
            $admin->setPassword($this->passwordHasher->hashPassword($admin, "adminpass$i"));
            $manager->persist($admin);

            // Fournisseur
            $provider = new User();
            $provider->setEmail("provider$i@example.com");
            $provider->setRoles(['ROLE_PROVIDER']);
            $provider->setActive(true);
            $provider->setPassword($this->passwordHasher->hashPassword($provider, "providerpass$i"));
            $manager->persist($provider);
            $providers[] = $provider;


            // Employé
            $employee = new User();
            $employee->setEmail("employee$i@example.com");
            $employee->setRoles(['ROLE_EMPLOYEE']);
            $employee->setPassword($this->passwordHasher->hashPassword($employee, "employeepass$i"));
            $manager->persist($employee);

            // Attribuer 2 prestations aléatoires à chaque employé
            $randomProvisions = array_rand($provisions, 2); // Sélectionner aléatoirement 2 indices de prestations
            foreach ($randomProvisions as $index) {
                $provisionEmployee = new ProvisionEmployee(); // Assurez-vous que cette entité existe et est configurée correctement
                $provisionEmployee->setEmployee($employee);
                $provisionEmployee->setProvision($provisions[$index]);
                $manager->persist($provisionEmployee);
            }
            $employees[] = $employee;
        }

        // Adresses à Paris
        $adresses = [
            '15 Rue de Vaugirard, 75006 Paris',
            '128 Rue La Boétie, 75008 Paris',
            '82 Rue du Faubourg Saint-Martin, 75010 Paris',
            '29 Rue de Rivoli, 75004 Paris',
            '56 Avenue des Champs-Élysées, 75008 Paris',
        ];

        foreach ($adresses as $i => $adresse) {
            $establishment = new Establishment();
            $establishment->setName("Etablissement $i");
            $establishment->setAdress($adresse);

            // Attribuer un fournisseur à l'établissement de manière cyclique
            $randomProviders = array_rand($providers, 2); // Sélectionner aléatoirement 2 indices de prestations
            foreach ($randomProviders as $index) {
                $establishment->setProvider($providers[$index]);
            }

            // Attribuer des prestations aléatoires à chaque établissement
            shuffle($provisions); // Mélanger le tableau des prestations
            for ($j = 0; $j < 2; $j++) { // Prenons 2 prestations par établissement pour l'exemple
                $establishment->addProvision($provisions[$j]);
            }

            shuffle($employees); // Mélanger le tableau des prestations
            for ($j = 0; $j < 2; $j++) { // Prenons 2 prestations par établissement pour l'exemple
                $establishment->addEmployee($employees[$j]);
            }

            $manager->persist($establishment);
    }


        // Enregistre les utilisateurs dans la base de données
        $manager->flush();
    }
}
