from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import CustomTokenObtainPairView




#multi
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),

    
    #gw udah muak
    path('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('login/', views.UserLoginView.as_view(), name='login'),  # Endpoint baru untuk login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),



    #ini user crud
    path('user/', views.UserListView.as_view(), name='user-list'),
    path('profile/', views.ProfileListView.as_view(), name='user-list'),
    path('api/user/add/', views.add_user),


]