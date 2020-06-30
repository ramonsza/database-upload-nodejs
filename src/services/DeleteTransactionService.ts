import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute(id: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactionForDelition = await transactionsRepository.findOne(id);

    if (!transactionForDelition) {
      throw new AppError('This transaction does not exist', 400);
    }

    await transactionsRepository.remove(transactionForDelition);
  }
}

export default DeleteTransactionService;
