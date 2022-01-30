import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { GetTransactionsDto } from './dto/get-transactions-filter.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Asset } from 'src/assets/entities/asset.entity';
import { User } from 'src/users/entities/user.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { AssetsService } from 'src/assets/assets.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private assetServ: AssetsService,
    private usersServ: UsersService,
    private orgServ: OrganizationsService,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const entityToSave = new Transaction();

    // validate required relationships
    const foundDonator = await this.usersServ.findOne(createTransactionDto.donater_user_id);
    if (!foundDonator) {
      throw new NotFoundException('Donator User Not found');
    }

    const foundAsset = await this.assetServ.findOne(createTransactionDto.asset_id);
    if (!foundAsset) {
      throw new NotFoundException('Asset Not found');
    }

    // map required
    entityToSave.donater_user = foundDonator as User;
    entityToSave.asset = foundAsset as Asset;

    // validate optional
    const foundDonatorOrg = await this.orgServ.findOne(
      createTransactionDto.donater_organization_id,
    );
    if (createTransactionDto.donater_organization_id) {
      if (!foundDonatorOrg) {
        throw new NotFoundException('Donator Organization Not found');
      } else {
        entityToSave.donater_organization = foundDonatorOrg;
      }
    }

    if (createTransactionDto.recipient_id) {
      const foundRecipient = await this.orgServ.findOne(createTransactionDto.recipient_id);
      if (!foundRecipient) {
        throw new NotFoundException('Recepient Organization not found');
      } else {
        entityToSave.recipient = foundRecipient;
      }
    }

    entityToSave.status = createTransactionDto.status;

    return this.transactionsRepository.save(entityToSave);
  }

  // async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
  //   return this.transactionsRepository.save(createTransactionDto);
  // }

  async getTransactions(getTransactionsDto: GetTransactionsDto): Promise<Transaction[]> {
    return this.transactionsRepository.find({ where: getTransactionsDto });
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const found = await this.transactionsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async updateTransaction(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.getTransactionById(id);
    const newTransaction = await this.transactionsRepository.save({
      ...transaction,
      ...updateTransactionDto,
    });
    return newTransaction;
  }

  async deleteTransaction(id: number): Promise<void> {
    const transactionToDelete = await this.transactionsRepository.delete(id);
    if (transactionToDelete.affected === 0) {
      throw new NotFoundException();
    }
  }
}
