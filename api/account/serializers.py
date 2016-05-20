from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=False)

    class Meta:
        model = Customer
        fields = ('id', 'first_name', 'last_name', 'email', 'password')

    def update(self, attrs, instance=None):
        user = super(CustomerSerializer, self).update(attrs, instance)
        if instance.get('password'):
            user.set_password(attrs.password)
            user.save()
        return user