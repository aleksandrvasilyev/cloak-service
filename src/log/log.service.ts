import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log, LogDocument } from './log.schema';
import { Model } from 'mongoose';

interface CreateLogDto {
  ip: string;
  userAgent: string;
  isBot: boolean;
  reasons: string[];
  processingTimeMs: number;
}

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  constructor(@InjectModel(Log.name) private readonly logModel: Model<LogDocument>) {}

  async save(dto: CreateLogDto): Promise<void> {
    try {
      await this.logModel.create(dto);
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message: unknown }).message
          : error;
      this.logger.error(`Error saving log: ${String(message)}`);
    }
  }

  async findAll(params: { limit: number; offset: number }): Promise<Log[]> {
    const { limit, offset } = params;
    return this.logModel
      .find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();
  }
}
