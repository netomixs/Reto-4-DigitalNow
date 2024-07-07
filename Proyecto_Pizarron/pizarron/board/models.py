from django.db import models
from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
class Board(models.Model):
    title = models.CharField(max_length=100)
    paint= models.ImageField(upload_to="boards/")
    autor=models.ForeignKey(User,on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    colors=models.JSONField(default=list,encoder=DjangoJSONEncoder)

    def __str__(self):
        return self.title
class Post(models.Model):
    description = models.TextField()
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    date_posted = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.date_posted