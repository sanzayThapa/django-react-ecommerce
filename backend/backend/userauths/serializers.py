from rest_framework import serializers
from auth.models import Profile, User
from rest_framework.simplejwt.serializers import TokenObtainPairSerializer



class MyTokenSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['username'] = user.username
        try :
            token['vendor_id'] = user.vendor_id
        except:
            token['vendor_id'] = 0
            
        return token
        
    

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('__all__')
        
class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = ('__all__')
        
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response
        