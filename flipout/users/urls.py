from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserDetailView, GetCSRFToken, get_csrf

urlpatterns = [
    path('get-csrf/', get_csrf, name='get_csrf'),
    path('get-csrf-token/', GetCSRFToken.as_view(), name='get_csrf_token'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
]