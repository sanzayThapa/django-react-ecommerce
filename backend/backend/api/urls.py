from django.urls import path, include

from userauths import views as userauths_views

urlpatterns = [
    path('user/token', userauths_views.MyTokenObtainPairView.as_view()),
    path('user/register', userauths_views.RegisterView.as_view())

    
]