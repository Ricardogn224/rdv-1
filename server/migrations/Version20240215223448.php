<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240215223448 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE "appointment_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "establishment_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "planning_doctor_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "provision_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "provision_employee_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "appointment" (id INT NOT NULL, provision_employee_id INT DEFAULT NULL, appointment_user_id INT DEFAULT NULL, motif VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_FE38F844D444588D ON "appointment" (provision_employee_id)');
        $this->addSql('CREATE INDEX IDX_FE38F844364DE1BD ON "appointment" (appointment_user_id)');
        $this->addSql('CREATE TABLE "establishment" (id INT NOT NULL, provider_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, adress VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DBEFB1EEA53A8AA ON "establishment" (provider_id)');
        $this->addSql('CREATE TABLE "planning_doctor" (id INT NOT NULL, employee_id INT DEFAULT NULL, appointment_id INT DEFAULT NULL, date VARCHAR(255) DEFAULT NULL, hour VARCHAR(255) DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, is_cancelled BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_7FE1D1058C03F15C ON "planning_doctor" (employee_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7FE1D105E5B533F9 ON "planning_doctor" (appointment_id)');
        $this->addSql('CREATE TABLE "provision" (id INT NOT NULL, establishment_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BA9B42908565851 ON "provision" (establishment_id)');
        $this->addSql('CREATE TABLE "provision_employee" (id INT NOT NULL, provision_id INT DEFAULT NULL, employee_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_84ECA5BA3EC01A31 ON "provision_employee" (provision_id)');
        $this->addSql('CREATE INDEX IDX_84ECA5BA8C03F15C ON "provision_employee" (employee_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, establishment_employee_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, date_of_birth DATE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, kbis VARCHAR(255) DEFAULT NULL, active BOOLEAN DEFAULT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('CREATE INDEX IDX_8D93D649BDA4BB0F ON "user" (establishment_employee_id)');
        $this->addSql('COMMENT ON COLUMN "user".created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "user".updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE "appointment" ADD CONSTRAINT FK_FE38F844D444588D FOREIGN KEY (provision_employee_id) REFERENCES "provision_employee" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "appointment" ADD CONSTRAINT FK_FE38F844364DE1BD FOREIGN KEY (appointment_user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "establishment" ADD CONSTRAINT FK_DBEFB1EEA53A8AA FOREIGN KEY (provider_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "planning_doctor" ADD CONSTRAINT FK_7FE1D1058C03F15C FOREIGN KEY (employee_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "planning_doctor" ADD CONSTRAINT FK_7FE1D105E5B533F9 FOREIGN KEY (appointment_id) REFERENCES "appointment" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "provision" ADD CONSTRAINT FK_BA9B42908565851 FOREIGN KEY (establishment_id) REFERENCES "establishment" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "provision_employee" ADD CONSTRAINT FK_84ECA5BA3EC01A31 FOREIGN KEY (provision_id) REFERENCES "provision" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "provision_employee" ADD CONSTRAINT FK_84ECA5BA8C03F15C FOREIGN KEY (employee_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D649BDA4BB0F FOREIGN KEY (establishment_employee_id) REFERENCES "establishment" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE "appointment_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE "establishment_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE "planning_doctor_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE "provision_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE "provision_employee_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE "appointment" DROP CONSTRAINT FK_FE38F844D444588D');
        $this->addSql('ALTER TABLE "appointment" DROP CONSTRAINT FK_FE38F844364DE1BD');
        $this->addSql('ALTER TABLE "establishment" DROP CONSTRAINT FK_DBEFB1EEA53A8AA');
        $this->addSql('ALTER TABLE "planning_doctor" DROP CONSTRAINT FK_7FE1D1058C03F15C');
        $this->addSql('ALTER TABLE "planning_doctor" DROP CONSTRAINT FK_7FE1D105E5B533F9');
        $this->addSql('ALTER TABLE "provision" DROP CONSTRAINT FK_BA9B42908565851');
        $this->addSql('ALTER TABLE "provision_employee" DROP CONSTRAINT FK_84ECA5BA3EC01A31');
        $this->addSql('ALTER TABLE "provision_employee" DROP CONSTRAINT FK_84ECA5BA8C03F15C');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D649BDA4BB0F');
        $this->addSql('DROP TABLE "appointment"');
        $this->addSql('DROP TABLE "establishment"');
        $this->addSql('DROP TABLE "planning_doctor"');
        $this->addSql('DROP TABLE "provision"');
        $this->addSql('DROP TABLE "provision_employee"');
        $this->addSql('DROP TABLE "user"');
    }
}
