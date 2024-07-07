from rest_framework import serializers
from .models import Board, Post
from rest_framework import serializers
from .models import Board
from django.contrib.auth.models import User
class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'

    def create(self, validated_data):
        return Board.objects.create(**validated_data)
    

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        return Post.objects.create(**validated_data)
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined']


    def create(self, validated_data):
        return User.objects.create(**validated_data)

