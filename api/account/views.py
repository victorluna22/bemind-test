from django.shortcuts import render
from rest_framework_jwt.views import JSONWebTokenAPIView, JSONWebTokenSerializer
from rest_framework_jwt.settings import api_settings
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Customer
from .serializers import CustomerSerializer
from rest_framework import status

jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


class ObtainAuthToken(JSONWebTokenAPIView):
    serializer_class = JSONWebTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data
        )
        if serializer.is_valid(raise_exception=True):
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            response_data = jwt_response_payload_handler(token, user, request)
            customer = CustomerSerializer(user.get_user())
            response_data['user'] = customer.data
            return Response(response_data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.filter(is_active=1).order_by('-id')
    serializer_class = CustomerSerializer
    permission_classes = (IsAuthenticated,)

    def destroy(self, request, pk=None, *args, **kwargs):
        super(CustomerViewSet, self).destroy(request, pk)
        return Response({'detail': 'Registro removido com sucesso'})