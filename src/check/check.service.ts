import { Injectable } from "@nestjs/common";
import { CheckRequestDto } from "./dto/check-request.dto";
import { CheckResponseDto } from "./dto/check-response.dto";

@Injectable()
export class CheckService {
  async check(dto: CheckRequestDto): Promise<CheckResponseDto> {
    return { isBot: false, reason: [] };
  }
}
