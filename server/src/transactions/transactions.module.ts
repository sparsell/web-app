import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { AssetsModule } from 'src/assets/assets.module';
import { User } from 'src/users/entities/user.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Asset } from 'src/assets/entities/asset.entity';
import { AssetsService } from 'src/assets/assets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User, Organization, Asset])],
  controllers: [TransactionsController],
  providers: [TransactionsService, UsersService, OrganizationsService, AssetsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
