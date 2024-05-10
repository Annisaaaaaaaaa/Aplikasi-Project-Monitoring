from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import CustomTokenObtainPairView, ClientListSearch, UserImportExcelAPIView, ProfileListView, GroupList, UserDeleteView, UserFilterViewSet




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


    #yg atas sesat
    path('api/groups/', GroupList.as_view(), name='group-list'),
    path('users/tambah/', views.UserListCreate.as_view(), name='user-list-create'),
    path('users/<int:pk>/', views.UserRetrieveUpdateDestroy.as_view(), name='user-detail'),
    path('profiles/administrator/', ProfileListView.as_view(), name='profile-list'),
    path('user/delete/<int:pk>/', UserDeleteView.as_view(), name='user_delete'),
    path('user/search/', ClientListSearch.as_view(), name='user-list-search'),
    path('user/filter/groups/', UserFilterViewSet.as_view(), name='filter_users'),
    path('user/import/excel/', UserImportExcelAPIView.as_view(), name='user_excel_import'),

    path('export_users/', views.export_users_to_excel, name='export_users_to_excel'),








]