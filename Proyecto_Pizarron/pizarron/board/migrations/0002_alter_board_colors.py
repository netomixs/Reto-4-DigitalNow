# Generated by Django 5.0.6 on 2024-07-04 19:40

import django.core.serializers.json
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='colors',
            field=models.JSONField(default=list, encoder=django.core.serializers.json.DjangoJSONEncoder),
        ),
    ]