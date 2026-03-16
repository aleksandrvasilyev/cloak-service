import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LogService } from './log.service';
import { Log } from './log.schema';

@ApiTags('logs')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 50 })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  @ApiOkResponse({ type: [Log] })
  async list(
    @Query('limit') limit = 50,
    @Query('offset') offset = 0,
  ): Promise<Log[]> {
    return this.logService.findAll({ limit: Number(limit), offset: Number(offset) });
  }
}

