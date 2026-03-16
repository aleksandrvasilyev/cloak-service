import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Log, LogDocument } from "./log.schema";
import { Model } from "mongoose";

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

  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}

  async save(dto: CreateLogDto): Promise<void> {
    try {
      await this.logModel.create(dto);
    } catch (error) {
      this.logger.error(`Error saving log: ${error.message}`);
    }
  }
}
