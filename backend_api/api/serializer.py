from api.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


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
        


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
