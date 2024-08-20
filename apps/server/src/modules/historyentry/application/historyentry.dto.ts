import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class HistoryentryCreateDto {
  @IsString()
  @IsOptional()
  timestamp?: string

  @IsString()
  @IsOptional()
  historyId?: string

  @IsString()
  @IsOptional()
  requirementId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class HistoryentryUpdateDto {
  @IsString()
  @IsOptional()
  timestamp?: string

  @IsString()
  @IsOptional()
  historyId?: string

  @IsString()
  @IsOptional()
  requirementId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
