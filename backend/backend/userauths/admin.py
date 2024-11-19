from django.contrib import admin
from .models import *


class User_admin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'phone']
    list_editable = ['email', 'phone']
    list_filter = ['full_name']
    search_fields = ['full_name']
class User_profile(admin.ModelAdmin):
    list_display = ['full_name', 'gender', 'country']
    list_editable = ['gender', 'country']



admin.site.register(User, User_admin)
admin.site.register(Profile, User_profile)
