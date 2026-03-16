import { CheckRequestDto } from 'src/check/dto/check-request.dto';

export interface FilterResult {
  triggered: boolean;
  reason?: string;
}

export interface BotFilter {
  check(request: CheckRequestDto): Promise<FilterResult> | FilterResult;
}

export const BOT_FILTER = 'BOT_FILTER';
