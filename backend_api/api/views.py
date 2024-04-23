from django.shortcuts import render
from django.http import JsonResponse
from api.models import User, Profile

from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, ProfileSerializer
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, ProfileSerializer
from rest_framework import generics, filters


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
from .serializer import UserLoginSerializer

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from django.http import JsonResponse
from .models import User

from django.http import JsonResponse
from django.views import View

from rest_framework import generics
from django.contrib.auth.models import Group
from .serializer import GroupSerializer, UserDeleteSerializer

import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Profile
from django.contrib.auth.hashers import make_password
import pandas as pd
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status

class GroupList(generics.ListAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


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

    
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

# CREATE
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

# MIX
class AkunListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    queryset = User.objects.all()
    serializer_class = UserSerializer


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


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    

#/... Ini yang Benar
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Edit
class UserRetrieveUpdateDestroy(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Hapus
class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDeleteSerializer


# View Profil
class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


#Search User Administrator
class ClientListSearch(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'first_name'] 


# Filter User by Groups
class UserFilterViewSet(APIView):
    def post(self, request):
        selected_groups = request.data.get('selected_groups', [])  # Mendapatkan daftar grup yang dipilih
        # Lakukan filter berdasarkan grup yang dipilih
        filtered_users = User.objects.filter(groups__in=selected_groups)
        # Serialize data pengguna yang difilter
        serialized_users = UserSerializer(filtered_users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)
    

# Eksport All Excel
from django.http import HttpResponse
from api.models import User
import openpyxl
from openpyxl import Workbook
import bcrypt

def decrypt_password(hashed_password, provided_password):
    # Fungsi untuk memverifikasi bahwa password asli cocok dengan hash yang disimpan
    if bcrypt.checkpw(provided_password.encode(), hashed_password.encode()):
        return provided_password
    else:
        return None
    
# Di dalam views.py
def export_users_to_excel(request):
    queryset = User.objects.all()
    wb = Workbook()
    ws = wb.active
    ws.append(['Name', 'Email', 'Username', 'Password', 'Title', 'Status', 'Role'])

    for obj in queryset:
        full_name = f"{obj.first_name} {obj.last_name}"
        email = obj.email
        username = obj.username
        password = obj.password  
        title = obj.profile.titles
        status = obj.profile.status
        groups = obj.groups

        ws.append([full_name, email, username, password, title, status, groups])

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=user_data.xlsx'
    wb.save(response)
    return response





# Import Excel
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserImportSerializer

class UserImportExcelAPIView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        file_serializer = UserImportSerializer(data=request.data)

        if file_serializer.is_valid():
            file_serializer.save()
            return Response({'message': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



