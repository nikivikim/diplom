from django.urls import path, include
from . import views
from users.views import Register

urlpatterns = [
    path('', include('django.contrib.auth.urls')),

    path('register/', Register.as_view(), name='register'),
    path('liquidity', views.your_view, name='liquidity'),
path('profile', views.profile, name='profile'),
    path('generate_report/', views.generate_report, name='generate_report'),
]
