from django.db import models
from django.utils.translation import gettext_lazy as _
from django.template.defaultfilters import slugify
import uuid

class Course(models.Model):
    title = models.CharField(max_length=256)
    slug = models.SlugField(null=False, unique=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="course", blank=True, null=True)
    created = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)


class Lesson(models.Model):
    title = models.CharField(max_length=256)
    slug = models.SlugField(null=False, unique=True)
    description = models.TextField(null=True, blank=True)
    number = models.IntegerField(default=1)
    created = models.DateTimeField(auto_now=True)
    course = models.ForeignKey(
        Course,
        related_name="lessons",
        on_delete=models.CASCADE,
    )

    def __str__(self) -> str:
        return f"{self.course.title} - {self.number}: {self.title}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title) + '-' + str(uuid.uuid4())[:4]
        return super().save(*args, **kwargs)


class LessonItem(models.Model):
    class TypeItem(models.TextChoices):
        VIDEO = 'video', _('Video')
        TEXT = 'text', _('Text')
        PDF = 'pdf', _('PDF')

    title = models.CharField(max_length=256)
    slug = models.SlugField(null=False, unique=True)
    lesson = models.ForeignKey(
        Lesson,
        related_name="items",
        on_delete=models.CASCADE
    )
    description = models.TextField(null=True, blank=True)
    number = models.IntegerField(default=1)
    typeItem = models.CharField(
        max_length=16,
        choices=TypeItem.choices,
        default=TypeItem.VIDEO
    )
    videoUrl = models.URLField(max_length=256)
    videoTime = models.IntegerField(null=True, blank=True)
    created = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return "{} - {}.{}: {}".format(
            self.lesson.course.title,
            self.lesson.number,
            self.number,
            self.title,
        )
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title) + '-' + str(uuid.uuid4())[:4]
        return super().save(*args, **kwargs)