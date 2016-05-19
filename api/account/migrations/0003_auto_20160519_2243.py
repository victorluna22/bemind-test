# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-19 22:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20160519_2237'),
    ]

    operations = [
        migrations.AddField(
            model_name='customerabstractuser',
            name='first_name',
            field=models.CharField(default='victor', max_length=120, verbose_name='Nome'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customerabstractuser',
            name='last_name',
            field=models.CharField(default='luna', max_length=120, verbose_name='Sobrenome'),
            preserve_default=False,
        ),
    ]