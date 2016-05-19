# coding: utf-8
from __future__ import unicode_literals
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from .manager import CustomerUserManager

GENDER_CHOICES = (('M', 'Masculino'),
                  ('F', 'Feminino'))


class CustomerAbstractUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(blank=True, null=True, max_length=120)
    first_name = models.CharField('Nome', max_length=120)
    last_name = models.CharField('Sobrenome', max_length=120)
    email = models.EmailField(verbose_name=u'Email', max_length=254, unique=True, db_index=True, null=True, blank=True)
    is_staff = models.BooleanField(verbose_name=u'Membro da equipe', default=False,
                                   help_text=u'Designa se este usuário pode acessar este site admin.')
    is_active = models.BooleanField(verbose_name=u'Ativo', default=True,
                                    help_text=u'Designa se este usuário está ativo.'
                                                u'Desmarque esta opção ao invés de deletar a conta.')
    date_joined = models.DateTimeField(verbose_name=u'Criado em', auto_now_add=True)
    objects = CustomerUserManager()

    USERNAME_FIELD = 'email'


class Customer(CustomerAbstractUser):
    phone = models.CharField('Telefone', max_length=15, null=True, blank=True)
    cpf = models.CharField('CPF', max_length=14, null=True, blank=True)
    gender = models.IntegerField('Sexo', choices=GENDER_CHOICES, null=True, blank=True)

    objects = CustomerUserManager()

    class Meta:
        verbose_name = 'cliente'
        verbose_name_plural = 'clientes'

    def get_full_name(self):
        return "%s %s" % (self.first_name, self.last_name)

    def __unicode__(self):
        return self.get_full_name()

    def get_user(self):
        return self.customer



