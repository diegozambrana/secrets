from django.contrib import admin
from courses.models import Course, Lesson, LessonItem


class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', )
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title',)


admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, CourseAdmin)
admin.site.register(LessonItem, CourseAdmin)