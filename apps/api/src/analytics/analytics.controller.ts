import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';

@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Get('summary')
  summary() {
    return this.analytics.summary();
  }

  @Get('timeseries')
  timeseries() {
    return this.analytics.timeseries();
  }

  @Get('devices')
  devices() {
    return this.analytics.devices();
  }

  @Get('browsers')
  browsers() {
    return this.analytics.browsers();
  }

  @Get('os')
  os() {
    return this.analytics.os();
  }

  @Get('countries')
  countries() {
    return this.analytics.countries();
  }

  @Get('referrers')
  referrers() {
    return this.analytics.referrers();
  }

  @Get('utm')
  utm() {
    return this.analytics.utm();
  }

  @Get('pages')
  pages() {
    return this.analytics.pages();
  }

  @Get('sections')
  sections() {
    return this.analytics.sections();
  }
}
