import { Inject, Injectable } from '@nestjs/common';
import { CheckRequestDto } from './dto/check-request.dto';
import { CheckResponseDto } from './dto/check-response.dto';
import { BOT_FILTER, BotFilter } from 'src/filters/filter.interface';
import { LogService } from 'src/log/log.service';

@Injectable()
export class CheckService {
  constructor(
    @Inject(BOT_FILTER) private readonly botFilter: BotFilter[],
    private readonly logService: LogService,
  ) {}

  async check(dto: CheckRequestDto): Promise<CheckResponseDto> {
    const startTime = Date.now();

    const results = await Promise.all(this.botFilter.map((filter) => filter.check(dto)));

    const triggered = results.filter((r) => r.triggered);
    const isBot = triggered.length > 0;
    const reasons = triggered.map((r) => r.reason).filter(Boolean) as string[];
    const processingTimeMs = Date.now() - startTime;

    void this.logService.save({
      ip: dto.ip,
      userAgent: dto.userAgent,
      isBot,
      reasons,
      processingTimeMs,
    });

    return { isBot, reasons };
  }
}
