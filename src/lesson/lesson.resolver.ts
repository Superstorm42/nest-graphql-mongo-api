import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService,
    ) {}
    @Query(returns => LessonType)
    lesson(@Args('id') id: string) {
        console.log('Came here 1');
        return this.lessonService.getLesson(id);
    }
    @Query(returns => [LessonType])
    lessons() {
        console.log('Came here 2');
        return this.lessonService.getAllLessons();
    }
    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ) {
        return this.lessonService.createLesson(createLessonInput);
    }
    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput')
        assignStudentsToLessonInput: AssignStudentsToLessonInput,
    ) {
        return this.lessonService.assignStudentsToLesson(
            assignStudentsToLessonInput,
        );
    }
    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }
}
