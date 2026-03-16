import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIP, IsObject, IsOptional, IsString } from "class-validator";

export class CheckRequestDto {
  @ApiProperty({ example: "123.427.462.49" })
  @IsIP()
  is: string;

  @ApiProperty({
    example:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ... (user agent)",
  })
  @IsString()
  userAgent: string;

  @ApiPropertyOptional({ example: { "accept-language": "en-US" } })
  @IsObject()
  @IsOptional()
  headers?: Record<string, string>;
}
