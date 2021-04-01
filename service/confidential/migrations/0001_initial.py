# Generated by Django 3.1.7 on 2021-03-31 17:59

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Secret',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('encrypted', models.BooleanField(default=False)),
                ('lifetime', models.IntegerField(default=1)),
            ],
        ),
    ]