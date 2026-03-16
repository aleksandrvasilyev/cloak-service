import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckService } from './check.service';
import { Body, Controller, HttpStatus, HttpCode, Post } from '@nestjs/common';
import { CheckRequestDto } from './dto/check-request.dto';
import { CheckResponseDto } from './dto/check-response.dto';

@ApiTags('check')
@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check if a request is a bot' })
  @ApiResponse({ status: HttpStatus.OK, type: CheckResponseDto })
  async check(@Body() checkRequestDto: CheckRequestDto): Promise<CheckResponseDto> {
    return this.checkService.check(checkRequestDto);
  }
}
