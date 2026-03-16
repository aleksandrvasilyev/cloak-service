import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { UserAgentFilter } from "./user-agent.filter";
import { HeadersFilter } from "./headers.filter";
import { IpTrustFilter } from "./ip-trust.filter";
import { BOT_FILTER } from "./filter.interface";

@Module({
  imports: [HttpModule],
  providers: [
    UserAgentFilter,
    HeadersFilter,
    IpTrustFilter,
    {
      provide: BOT_FILTER,
      useFactory: (
        ua: UserAgentFilter,
        headers: HeadersFilter,
        ip: IpTrustFilter,
      ) => [ua, headers, ip],
      inject: [UserAgentFilter, HeadersFilter, IpTrustFilter],
    },
  ],
  exports: [BOT_FILTER],
})
export class FiltersModule {}
