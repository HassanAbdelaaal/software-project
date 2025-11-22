import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmployeeProfileDocument = EmployeeProfile & Document;

// Embedded sub-schemas
@Schema({ _id: false })
class PersonalDetails {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  middleName?: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true, enum: ['Male', 'Female'] })
  gender: string;

  @Prop({ required: true })
  nationalId: string;

  @Prop()
  nationality: string;

  @Prop()
  maritalStatus: string;
}

@Schema({ _id: false })
class ContactDetails {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  alternativePhoneNumber?: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  postalCode: string;
}

@Schema({ _id: false })
class EmploymentInformation {
  @Prop({ required: true, unique: true })
  employeeId: string;

  @Prop({ required: true })
  hireDate: Date;

  @Prop()
  workReceivingDate?: Date;

  @Prop({ required: true, enum: ['Active', 'Inactive', 'On Leave', 'Terminated'] })
  employmentStatus: string;

  @Prop({ required: true, enum: ['Full-Time', 'Part-Time', 'Contract', 'Intern'] })
  employmentType: string;

  @Prop()
  probationEndDate?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Position' })
  positionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  departmentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile' })
  managerId?: Types.ObjectId;

  @Prop()
  payGrade: string;
}

@Schema({ _id: false })
class BankDetails {
  @Prop()
  bankName: string;

  @Prop()
  accountNumber: string;

  @Prop()
  iban: string;

  @Prop()
  branchCode: string;
}

@Schema({ _id: false })
class EmergencyContact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  relationship: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  alternativePhoneNumber?: string;
}

@Schema({ _id: false })
class ChangeRequest {
  @Prop({ required: true })
  fieldName: string;

  @Prop({ required: true })
  currentValue: string;

  @Prop({ required: true })
  requestedValue: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] })
  status: string;

  @Prop({ default: Date.now })
  requestDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  reviewedBy?: Types.ObjectId;

  @Prop()
  reviewDate?: Date;

  @Prop()
  reviewComments?: string;
}

@Schema({ timestamps: true })
export class EmployeeProfile {
  @Prop({ type: PersonalDetails, required: true })
  personalDetails: PersonalDetails;

  @Prop({ type: ContactDetails, required: true })
  contactDetails: ContactDetails;

  @Prop({ type: EmploymentInformation, required: true })
  employmentInformation: EmploymentInformation;

  @Prop({ type: BankDetails })
  bankDetails?: BankDetails;

  @Prop({ type: [EmergencyContact] })
  emergencyContacts: EmergencyContact[];

  @Prop()
  profilePicture?: string;

  @Prop({ type: [ChangeRequest], default: [] })
  changeRequests: ChangeRequest[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'PerformanceAppraisal' }], default: [] })
  performanceHistory: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date })
  terminationDate?: Date;

  @Prop()
  terminationReason?: string;
}

export const EmployeeProfileSchema = SchemaFactory.createForClass(EmployeeProfile);

// Add indexes for better query performance
EmployeeProfileSchema.index({ 'employmentInformation.employeeId': 1 });
EmployeeProfileSchema.index({ 'contactDetails.email': 1 });
EmployeeProfileSchema.index({ 'employmentInformation.departmentId': 1 });
EmployeeProfileSchema.index({ 'employmentInformation.positionId': 1 });