from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Welcome to Ali's Django + Firebase Project</h1>")

urlpatterns = [
    path('', home),  # 🔥 Root URL now returns a basic HTML response
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
