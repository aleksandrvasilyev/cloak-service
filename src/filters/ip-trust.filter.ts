import { Logger } from '@nestjs/common';
import { BotFilter, FilterResult } from './filter.interface';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CheckRequestDto } from 'src/check/dto/check-request.dto';
import { firstValueFrom } from 'rxjs';

interface VpnApiResponse {
  security: {
    vpn: boolean;
    proxy: boolean;
    tor: boolean;
    relay: boolean;
  };
  network: {
    autonomous_system_organization: string;
  };
}

const DATACENTER_PATTERNS = [
  /amazon/i,
  /google/i,
  /microsoft/i,
  /cloudflare/i,
  /digitalocean/i,
  /linode/i,
  /rackspace/i,
  /softlayer/i,
  /vultr/i,
];

export class IpTrustFilter implements BotFilter {
  private readonly logger = new Logger(IpTrustFilter.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async check(request: CheckRequestDto): Promise<FilterResult> {
    const apiKey = this.configService.get<string>('VPN_API_KEY');

    if (!apiKey) {
      this.logger.warn('VPN_API_KEY is not set, skipping IP trust check');
      return { triggered: false };
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<VpnApiResponse>(`https://vpnapi.io/api/${request.ip}?key=${apiKey}`),
      );

      const { vpn, proxy, tor, relay } = data.security;

      if (!vpn || proxy || tor || relay) {
        return { triggered: true, reason: 'vpn_or_proxy' };
      }

      const org = data.network?.autonomous_system_organization ?? '';

      if (DATACENTER_PATTERNS.some((pattern) => pattern.test(org))) {
        return { triggered: true, reason: 'datacenter_ip' };
      }

      return { triggered: false };
    } catch (error) {
      this.logger.error(`Error checking IP trust: ${error.message}`);
      return { triggered: false };
    }
  }
}
