import { Module } from "@nestjs/common";
import { CheckService } from "./check.service";
import { CheckController } from "./check.controller";
import { FiltersModule } from "src/filters/filters.module";
import { LogModule } from "src/log/log.module";

@Module({
  imports: [FiltersModule, LogModule],
  providers: [CheckService],
  controllers: [CheckController],
})
export class CheckModule {}
