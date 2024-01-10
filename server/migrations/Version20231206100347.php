<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231206100347 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE comment_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "employee_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "establishment_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE product_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "provider_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "provision_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "provision_employee_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE publication_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE comment (id INT NOT NULL, post_id INT NOT NULL, author_id INT NOT NULL, content VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9474526C4B89032C ON comment (post_id)');
        $this->addSql('CREATE INDEX IDX_9474526CF675F31B ON comment (author_id)');
        $this->addSql('COMMENT ON COLUMN comment.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE "employee" (id INT NOT NULL, establishment_id INT DEFAULT NULL, user_employee_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5D9F75A18565851 ON "employee" (establishment_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5D9F75A1251838C9 ON "employee" (user_employee_id)');
        $this->addSql('CREATE TABLE "establishment" (id INT NOT NULL, provider_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, adress VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DBEFB1EEA53A8AA ON "establishment" (provider_id)');
        $this->addSql('CREATE TABLE product (id INT NOT NULL, name VARCHAR(255) NOT NULL, price INT NOT NULL, published BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, documentation_url VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN product.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE product_user (product_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(product_id, user_id))');
        $this->addSql('CREATE INDEX IDX_7BF4E84584665A ON product_user (product_id)');
        $this->addSql('CREATE INDEX IDX_7BF4E8A76ED395 ON product_user (user_id)');
        $this->addSql('CREATE TABLE "provider" (id INT NOT NULL, user_provider_id INT DEFAULT NULL, kbis VARCHAR(255) NOT NULL, active BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_92C4739CA348613F ON "provider" (user_provider_id)');
        $this->addSql('CREATE TABLE "provision" (id INT NOT NULL, establishment_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BA9B42908565851 ON "provision" (establishment_id)');
        $this->addSql('CREATE TABLE "provision_employee" (id INT NOT NULL, employee_id INT DEFAULT NULL, provision_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_84ECA5BA8C03F15C ON "provision_employee" (employee_id)');
        $this->addSql('CREATE INDEX IDX_84ECA5BA3EC01A31 ON "provision_employee" (provision_id)');
        $this->addSql('CREATE TABLE publication (id INT NOT NULL, author_id INT NOT NULL, title VARCHAR(255) NOT NULL, resume TEXT NOT NULL, content TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AF3C6779F675F31B ON publication (author_id)');
        $this->addSql('COMMENT ON COLUMN publication.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, date_of_birth DATE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('COMMENT ON COLUMN "user".created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN "user".updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C4B89032C FOREIGN KEY (post_id) REFERENCES publication (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CF675F31B FOREIGN KEY (author_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "employee" ADD CONSTRAINT FK_5D9F75A18565851 FOREIGN KEY (establishment_id) REFERENCES "establishment" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "employee" ADD CONSTRAINT FK_5D9F75A1251838C9 FOREIGN KEY (user_employee_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "establishment" ADD CONSTRAINT FK_DBEFB1EEA53A8AA FOREIGN KEY (provider_id) REFERENCES "provider" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product_user ADD CONSTRAINT FK_7BF4E84584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product_user ADD CONSTRAINT FK_7BF4E8A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "provider" ADD CONSTRAINT FK_92C4739CA348613F FOREIGN KEY (user_provider_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "provision" ADD CONSTRAINT FK_BA9B42908565851 FOREIGN KEY (establishment_id) REFERENCES "establishment" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "provision_employee" ADD CONSTRAINT FK_84ECA5BA8C03F15C FOREIGN KEY (employee_id) REFERENCES "employee" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "provision_employee" ADD CONSTRAINT FK_84ECA5BA3EC01A31 FOREIGN KEY (provision_id) REFERENCES "provision" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE publication ADD CONSTRAINT FK_AF3C6779F675F31B FOREIGN KEY (author_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE comment_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "employee_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE "establishment_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE product_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "provider_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE "provision_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE "provision_employee_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE publication_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526C4B89032C');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526CF675F31B');
        $this->addSql('ALTER TABLE "employee" DROP CONSTRAINT FK_5D9F75A18565851');
        $this->addSql('ALTER TABLE "employee" DROP CONSTRAINT FK_5D9F75A1251838C9');
        $this->addSql('ALTER TABLE "establishment" DROP CONSTRAINT FK_DBEFB1EEA53A8AA');
        $this->addSql('ALTER TABLE product_user DROP CONSTRAINT FK_7BF4E84584665A');
        $this->addSql('ALTER TABLE product_user DROP CONSTRAINT FK_7BF4E8A76ED395');
        $this->addSql('ALTER TABLE "provider" DROP CONSTRAINT FK_92C4739CA348613F');
        $this->addSql('ALTER TABLE "provision" DROP CONSTRAINT FK_BA9B42908565851');
        $this->addSql('ALTER TABLE "provision_employee" DROP CONSTRAINT FK_84ECA5BA8C03F15C');
        $this->addSql('ALTER TABLE "provision_employee" DROP CONSTRAINT FK_84ECA5BA3EC01A31');
        $this->addSql('ALTER TABLE publication DROP CONSTRAINT FK_AF3C6779F675F31B');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE "employee"');
        $this->addSql('DROP TABLE "establishment"');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE product_user');
        $this->addSql('DROP TABLE "provider"');
        $this->addSql('DROP TABLE "provision"');
        $this->addSql('DROP TABLE "provision_employee"');
        $this->addSql('DROP TABLE publication');
        $this->addSql('DROP TABLE "user"');
    }
}
