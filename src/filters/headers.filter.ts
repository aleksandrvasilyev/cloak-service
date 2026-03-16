import { Injectable } from "@nestjs/common";
import { BotFilter, FilterResult } from "./filter.interface";
import { CheckRequestDto } from "src/check/dto/check-request.dto";

@Injectable()
export class HeadersFilter implements BotFilter {
  async check(request: CheckRequestDto): Promise<FilterResult> {
    const headers = request.headers ?? {};

    const normalized = Object.fromEntries(
      Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]),
    );

    if (!normalized["accept-language"]) {
      return { triggered: true, reason: "missing_accept_language" };
    }

    if (!normalized["accept-encoding"]) {
      return { triggered: true, reason: "missing_accept_encoding" };
    }

    return { triggered: false };
  }
}
