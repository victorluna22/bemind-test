# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-19 22:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='cpf',
            field=models.CharField(blank=True, max_length=14, null=True, verbose_name='CPF'),
        ),
        migrations.AlterField(
            model_name='customer',
            name='gender',
            field=models.IntegerField(blank=True, choices=[('M', 'Masculino'), ('F', 'Feminino')], null=True, verbose_name='Sexo'),
        ),
        migrations.AlterField(
            model_name='customer',
            name='phone',
            field=models.CharField(blank=True, max_length=15, null=True, verbose_name='Telefone'),
        ),
    ]
