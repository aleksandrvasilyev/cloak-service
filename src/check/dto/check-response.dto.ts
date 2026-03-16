import { ApiProperty } from '@nestjs/swagger';

export class CheckResponseDto {
  @ApiProperty({ example: true })
  isBot: boolean;

  @ApiProperty({ example: ['datacenter_ip', 'headless_browser'] })
  reasons: string[];
}
