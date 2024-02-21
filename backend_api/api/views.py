from django.shortcuts import render
from django.http import JsonResponse
from api.models import User

from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserLoginSerializer, ClientSerializer


from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            if user.groups.filter(name='administrator').exists():
                # Logic for Administrator login
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
            elif user.groups.filter(name='pm').exists():
                # Logic for Project Manager login
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
            elif user.groups.filter(name='sales').exists():
                # Logic for Sales login
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
            # Add more conditions for other groups
            elif user.groups.filter(name='engineer').exists():
                # Logic for Sales login
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
            # Add more conditions for other groups
            elif user.groups.filter(name='admin').exists():
                # Logic for Sales login
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
            # Add more conditions for other groups
            else:
                return Response({"error": "Invalid group"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Get All Routes
class ClientListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = ClientSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

from django.http import JsonResponse
from django.views import View
import requests

class YourApiView(View):
    def get(self, request, *args, **kwargs):
        # Ambil token dengan melakukan permintaan ke endpoint token
        token_url = 'http://localhost:8000/api/v1/auth/token/'
        token_data = {
            'email': 'alam2@gmail.com',
            'password': '12345678_'
        }

        token_response = requests.post(token_url, data=token_data)
        token = token_response.json().get('access', None)

        if not token:
            # Token tidak berhasil diperoleh, tanggapi sesuai kebutuhan Anda
            return JsonResponse({'error': 'Unable to obtain access token'})

        # Jika token berhasil diperoleh, gunakan token untuk akses endpoint yang dilindungi
        api_url = 'http://localhost:8000/api/v1/document/'
        api_headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

        api_response = requests.get(api_url, headers=api_headers)
        api_data = api_response.json()

        return JsonResponse(api_data)




class UserLoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)