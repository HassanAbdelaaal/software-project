import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppraisalTemplate, AppraisalTemplateSchema } from './schemas/performance-appraisal.schema';
import { PerformanceAppraisal, PerformanceAppraisalSchema } from './schemas/performance-appraisal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppraisalTemplate.name, schema: AppraisalTemplateSchema },
      { name: PerformanceAppraisal.name, schema: PerformanceAppraisalSchema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class PerformanceModule {}