import string
from shortuuid import random
from api.models import User
from api.models import Profile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, Profile



from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, Profile

from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import Profile, User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group 



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        username = attrs.get(self.username_field)
        password = attrs.get('password')
        if username is None or password is None:
            return attrs
        user = User.objects.filter(**{self.username_field: username}).first()
        if user:
            if user.check_password(password):
                return data
        raise serializers.ValidationError('Incorrect credentials')


# Class Buat Bikin Token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified

        token['groups'] = [user.groups.first().id]
        token['namamiau'] = [user.groups.name]
        
        return token
    


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
    

class UserLoginSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': 'Tidak ada akun yang aktif dengan kredensial yang diberikan.',
        'no_account_with_group': 'Tidak ada akun dengan grup yang sesuai.',
    }

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }

        if all(credentials.values()):
            user = authenticate(**credentials)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError(self.error_messages['no_active_account'])
                
                group = user.profile.group
                if group != attrs.get('group'):
                    raise serializers.ValidationError(self.error_messages['no_account_with_group'])
                
                data = {}
                refresh = self.get_token(user)
                data['refresh'] = str(refresh)
                data['access'] = str(refresh.access_token)
                return data
            else:
                raise serializers.ValidationError(self.error_messages['no_active_account'])
        else:
            raise serializers.ValidationError('Must include "email" and "password".')
        


#YAA

#Table Groups
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        password2 = validated_data.pop('password2')

        if password != password2:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        return user



#Profile
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


# Profile untuk Add hanya di Admin
class ProfileForAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['titles', 'status', 'full_name']


# Untuk Delete User
class UserDeleteSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = '__all__'

    def delete(self, instance):
        # Hapus profil terkait dengan pengguna yang dihapus
        instance.profile.delete()
        # Hapus pengguna
        instance.delete()


# Untuk Lihat dan Tambah User
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileForAdminSerializer()
    groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'is_active', 'is_superuser', 'profile', 'groups']

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        groups_data = validated_data.pop('groups', [])
        validated_data['password'] = make_password(validated_data['password'])

        # Step 1: Create User without groups
        user = User.objects.create(**validated_data)

        # Step 2: Create or update Profile
        profile_instance, _ = Profile.objects.get_or_create(user=user)
        profile_instance.full_name = profile_data.get('full_name', profile_instance.full_name)
        profile_instance.status = profile_data.get('status', profile_instance.status)
        profile_instance.titles = profile_data.get('titles', profile_instance.titles)
        profile_instance.save()

        # Set user instance for profile
        profile_instance.user = user
        profile_instance.save()

        # Step 3: Add groups to the newly created User
        for group_id in groups_data:
            try:
                group_id = group_id.id if isinstance(group_id, Group) else group_id
                group = Group.objects.get(id=group_id)
                user.groups.add(group)
            except Group.DoesNotExist:
                pass

        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        profile = instance.profile

        # Update user fields
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.is_superuser = validated_data.get('is_superuser', instance.is_superuser)
        instance.save()

        # Update profile fields
        profile.full_name = profile_data.get('full_name', profile.full_name)
        profile.status = profile_data.get('status', profile.status)
        profile.titles = profile_data.get('titles', profile.titles)
        profile.save()

        # Update user groups
        groups_data = validated_data.pop('groups', [])
        instance.groups.set(groups_data)

        return instance


# Import Excel
from rest_framework import serializers
from .models import User, Profile
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

from rest_framework import serializers
from .models import User, Profile

from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import User, Profile

class UserImportSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='profile.full_name')
    email = serializers.EmailField()
    groups = serializers.CharField()
    title = serializers.CharField(source='profile.titles')
    status = serializers.CharField()

    class Meta:
        model = User
        fields = ['full_name', 'email', 'groups', 'title', 'status']

    def create(self, validated_data):
        full_name = validated_data['profile']['full_name']
        email = validated_data['email']
        groups_name = validated_data['groups']
        title = validated_data['profile']['titles']
        status = validated_data['status']

        # Generate username from full_name
        username = full_name.lower().replace(' ', '_')
        if User.objects.filter(username=username).exists():
            username += '_' + str(User.objects.filter(username__startswith=username).count() + 1)

        # Check if email exists
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email already exists')

        # Get or create groups
        groups = []
        for group_name in groups_name.split(','):
            group, created = Group.objects.get_or_create(name=group_name.strip())
            groups.append(group)

        # Create user profile
        profile_data = {'full_name': full_name, 'titles': title}
        profile = Profile.objects.create(**profile_data)

        # Create user
        user_data = {'username': username, 'email': email, 'status': status, 'profile': profile}
        user = User.objects.create(**user_data)

        # Add user to groups
        user.groups.add(*groups)

        return user
