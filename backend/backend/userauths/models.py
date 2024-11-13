from django.db import models
from django.contrib.auth.models import AbstractUser
# from shortuuid.djangofields import ShortUUIDField

from shortuuid.django_fields import ShortUUIDField
class User(AbstractUser):
    username = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True)  # Increased max_length
    full_name = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=10)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
    
    def __unicode__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        if '@' in self.email:  # Check if email contains @
            email_username = self.email.split('@')[0]  # Safely get username part
        else:
            email_username = self.email  # Fallback if email format is incorrect
            
        if not self.full_name:  # Better way to check for empty values
            self.full_name = self.email
            
        if not self.username:  # Better way to check for empty values
            self.username = email_username
            
        super(User, self).save(*args, **kwargs)
    
    
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to="image", default="default/default_user_image.jpg")  # Fixed typo
    about = models.CharField(max_length=100, blank=True, null=True)
    full_name = models.CharField(max_length=100, blank=True, null=True)  # Added missing field
    gender = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    
    pid = ShortUUIDField(
        max_length=100, 
        length=10, 
        unique=True, 
        alphabet="abcdefghijklmnopqrstuvwxyz"  # Fixed missing 'n'
    )
    
    def __str__(self):
        if self.full_name:
            return str(self.full_name)
        return str(self.user.full_name)
    
    def save(self, *args, **kwargs):
        if not self.full_name:  # Better way to check for empty values
            self.full_name = self.user.full_name
        super(Profile, self).save(*args, **kwargs)


# Optional: Add related_name to make reverse lookups easier
class Profile(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='profiles'  # This allows user.profiles.all()
    )
    # ... rest of the model remains the same