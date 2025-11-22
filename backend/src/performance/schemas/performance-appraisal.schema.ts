import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PerformanceAppraisalDocument = PerformanceAppraisal & Document;

@Schema({ _id: false })
class RatingScale {
  @Prop({ required: true })
  scaleName: string;

  @Prop({ required: true })
  minValue: number;

  @Prop({ required: true })
  maxValue: number;

  @Prop({ type: [{ value: Number, label: String, description: String }] })
  scaleValues: { value: number; label: string; description: string }[];
}

@Schema({ _id: false })
class EvaluationCriteria {
  @Prop({ required: true })
  criteriaName: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  weight: number; // Percentage weight in final score

  @Prop({ type: RatingScale })
  ratingScale: RatingScale;
}

@Schema({ timestamps: true })
export class AppraisalTemplate {
  @Prop({ required: true, unique: true })
  templateCode: string;

  @Prop({ required: true })
  templateName: string;

  @Prop()
  description?: string;

  @Prop({ required: true, enum: ['Annual', 'Probationary', 'Mid-Year', 'Project-Based'] })
  appraisalType: string;

  @Prop({ type: [EvaluationCriteria], required: true })
  evaluationCriteria: EvaluationCriteria[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Department' }] })
  applicableDepartments: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile', required: true })
  createdBy: Types.ObjectId;
}

export const AppraisalTemplateSchema = SchemaFactory.createForClass(AppraisalTemplate);

@Schema({ _id: false })
class CriteriaRating {
  @Prop({ required: true })
  criteriaName: string;

  @Prop({ required: true })
  rating: number;

  @Prop()
  comments?: string;

  @Prop()
  weight: number;
}

@Schema({ _id: false })
class PerformanceDispute {
  @Prop({ required: true })
  disputeReason: string;

  @Prop({ required: true })
  disputeDetails: string;

  @Prop({ default: Date.now })
  submittedDate: Date;

  @Prop({ default: 'Pending', enum: ['Pending', 'Under Review', 'Resolved', 'Rejected'] })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile' })
  reviewedBy?: Types.ObjectId;

  @Prop()
  reviewDate?: Date;

  @Prop()
  reviewComments?: string;

  @Prop()
  adjustedRating?: number;
}

@Schema({ timestamps: true })
export class PerformanceAppraisal {
  @Prop({ required: true, unique: true })
  appraisalId: string;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile', required: true })
  employeeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile', required: true })
  reviewerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AppraisalTemplate', required: true })
  templateId: Types.ObjectId;

  @Prop({ required: true })
  appraisalPeriodStart: Date;

  @Prop({ required: true })
  appraisalPeriodEnd: Date;

  @Prop({ type: [CriteriaRating], required: true })
  ratings: CriteriaRating[];

  @Prop({ required: true })
  overallRating: number;

  @Prop()
  overallComments?: string;

  @Prop()
  strengths?: string;

  @Prop()
  areasForImprovement?: string;

  @Prop()
  developmentRecommendations?: string;

  @Prop({ default: false })
  attendanceConsidered: boolean;

  @Prop()
  attendanceScore?: number;

  @Prop({ required: true, enum: ['Draft', 'Submitted', 'Published', 'Disputed', 'Finalized', 'Archived'] })
  status: string;

  @Prop()
  submittedDate?: Date;

  @Prop()
  publishedDate?: Date;

  @Prop({ type: PerformanceDispute })
  dispute?: PerformanceDispute;

  @Prop()
  finalizedDate?: Date;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile' })
  finalizedBy?: Types.ObjectId;
}

export const PerformanceAppraisalSchema = SchemaFactory.createForClass(PerformanceAppraisal);

PerformanceAppraisalSchema.index({ employeeId: 1 });
PerformanceAppraisalSchema.index({ reviewerId: 1 });
PerformanceAppraisalSchema.index({ status: 1 });
PerformanceAppraisalSchema.index({ appraisalPeriodStart: 1, appraisalPeriodEnd: 1 });