import { CheckRequestDto } from 'src/check/dto/check-request.dto';
import { BotFilter, FilterResult } from './filter.interface';
import { Injectable } from '@nestjs/common';

const HEADLESS_PATTERNS = [
  /headlesschrome/i,
  /phantomjs/i,
  /selenium/i,
  /playwright/i,
  /puppeteer/i,
  /cypress/i,
  /testcafe/i,
  /nightwatch/i,
  /webdriverio/i,
  /testim/i,
  /testomatio/i,
  /testomatio/i,
];

const BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /yandexbot/i,
  /duckduckbot/i,
  /baidubot/i,
  /sogoubot/i,
  /yahoo/i,
  /applebot/i,
  /linkedinbot/i,
  /crawler/i,
  /spider/i,
];

@Injectable()
export class UserAgentFilter implements BotFilter {
  async check(request: CheckRequestDto): Promise<FilterResult> {
    const ua = request.userAgent?.trim();

    if (!ua) {
      return { triggered: true, reason: 'empty_user_agent' };
    }

    if (HEADLESS_PATTERNS.some((pattern) => pattern.test(ua))) {
      return { triggered: true, reason: 'headless_browser' };
    }

    if (BOT_PATTERNS.some((pattern) => pattern.test(ua))) {
      return { triggered: true, reason: 'known_bot' };
    }

    return { triggered: false };
  }
}
