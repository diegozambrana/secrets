from django.db.models import fields
import graphene
from graphene_django import DjangoObjectType

from courses.models import Course, Lesson, LessonItem

class CourseType(DjangoObjectType):
    class Meta:
        model = Course
        fields = (
            'title',
            'slug',
            'description',
            'image',
            'created',
            'lessons'
        )

class LessonType(DjangoObjectType):
    class Meta:
        model = Lesson
        fields = (
            'title',
            'slug',
            'description',
            'number',
            'created',
            'items'
        )

class LessonItemType(DjangoObjectType):
    class Meta:
        model = LessonItem
        fields = (
            'title',
            'slug',
            'description',
            'number',
            'typeItem',
            'videoUrl',
            'videoTime',
            'created'
        )

class Query(graphene.ObjectType):
    all_courses = graphene.List(CourseType)
    all_lessons = graphene.List(LessonType)
    all_lesson_items = graphene.List(LessonItemType)
    course_by_slug = graphene.Field(
        CourseType,
        slug=graphene.String(required=True)
    )

    def resolve_all_courses(root, info):
        return Course.objects.all()
    
    def resolve_all_lessons(root, info):
        return Lesson.objects.select_related('course').all()
    
    def resolve_all_lesson_items(root, info):
        return LessonItem.objects.select_related('lesson').all()
    
    def resolve_course_by_slug(root, info, slug):
        try:
            return Course.objects.get(slug=slug)
        except Course.DoesNotExist:
            return None

schema = graphene.Schema(query=Query)