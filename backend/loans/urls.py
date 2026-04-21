from django.urls import path
from .views import create_loan

urlpatterns = [
    path('apply/', create_loan),
]