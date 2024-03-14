from django.shortcuts import render
from django.http import JsonResponse
from api.models import User
from api.models import Profile

from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, ProfileSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

#Create dan List
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/user/',
        '/api/profile/'
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
