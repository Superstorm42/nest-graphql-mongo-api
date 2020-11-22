import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength, isDateString, IsDateString } from 'class-validator';
@InputType()
export class AssignStudentsToLessonInput {
    @Field(type => ID)
    lessonId: string;

    @Field(type => [ID])
    studentIds: string[];
}
