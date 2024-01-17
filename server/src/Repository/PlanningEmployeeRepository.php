<?php

namespace App\Repository;

use App\Entity\PlanningEmployee;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PlanningEmployee>
 *
 * @method PlanningEmployee|null find($id, $lockMode = null, $lockVersion = null)
 * @method PlanningEmployee|null findOneBy(array $criteria, array $orderBy = null)
 * @method PlanningEmployee[]    findAll()
 * @method PlanningEmployee[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlanningEmployeeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PlanningEmployee::class);
    }

//    /**
//     * @return PlanningEmployee[] Returns an array of PlanningEmployee objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PlanningEmployee
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
