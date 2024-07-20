# skate/urls.py

from django.urls import path
from .views import SpotListCreateView, SpotDetailView

urlpatterns = [
    path('spots/', SpotListCreateView.as_view(), name='spot-list-create'),
    path('spots/<int:pk>/', SpotDetailView.as_view(), name='spot-detail'),
]
